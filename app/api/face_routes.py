import os
import json
import numpy as np
from fastapi import APIRouter, UploadFile, Query
from fastapi.responses import JSONResponse
from PIL import Image
import io
import cv2
import insightface

router = APIRouter()

# Gallery paths
GALLERY_DIR = os.path.join("app", "gallery")
EMBEDDINGS_PATH = os.path.join(GALLERY_DIR, "face_embeddings.npy")
METADATA_PATH = os.path.join(GALLERY_DIR, "metadata.json")

# Load embeddings and metadata once at startup
if os.path.exists(EMBEDDINGS_PATH) and os.path.exists(METADATA_PATH):
    embeddings = np.load(EMBEDDINGS_PATH)
    with open(METADATA_PATH, "r", encoding="utf-8") as f:
        metadata_list = json.load(f)
else:
    embeddings = None
    metadata_list = []

# Build face_db: list of tuples (name, embedding, info)
face_db = []
if embeddings is not None and len(metadata_list) == embeddings.shape[0]:
    for meta in metadata_list:
        idx = meta["embedding_index"]
        name = meta.get("name", "")
        info = meta.get("info", "")
        face_db.append((name, embeddings[idx], info))
else:
    face_db = []

# Load InsightFace antelopev2 for multi-face detection (includes 2d106 landmarks)
MODEL_DIR = os.path.join("app", "ml", "models", "insightface")
app = insightface.app.FaceAnalysis(name="antelopev2", root=MODEL_DIR)
app.prepare(ctx_id=-1, det_size=(640, 640))

def capture_from_camera(camera_index=0):
    cap = cv2.VideoCapture(camera_index)
    if not cap.isOpened():
        raise RuntimeError(f"Cannot open camera: {camera_index}")
    ret, frame = cap.read()
    cap.release()
    if not ret:
        raise RuntimeError("Failed to capture frame from camera")
    _, buffer = cv2.imencode(".jpg", frame)
    return buffer.tobytes()

# ------- Blink Detection Helpers (using 2d106 landmarks) -------
LEFT_EYE_INDICES = list(range(72, 84))
RIGHT_EYE_INDICES = list(range(84, 96))

def eye_aspect_ratio(eye_landmarks):
    ldmk = np.array(eye_landmarks)
    # Correctly select corresponding points
    hor = np.linalg.norm(ldmk[0] - ldmk)
    ver = (np.linalg.norm(ldmk - ldmk) + np.linalg.norm(ldmk - ldmk)) / 2
    if hor == 0:
        return 0.0
    return ver / hor

@router.post("/search")
async def search(
    file: UploadFile = None,
    top_k: int = 5,
    camera_source: str = Query(None, description="Camera index or RTSP/HTTP URL"),
    source: str = Query("file")  # 'webcam' for webcam, 'file' for upload, default is 'file'
):
    try:
        # Get image bytes
        known_webcam = (source == "webcam" or camera_source is not None)
        if file:
            img_bytes = await file.read()
        elif camera_source is not None:
            try:
                cam_index = int(camera_source)
            except ValueError:
                cam_index = camera_source
            img_bytes = capture_from_camera(cam_index)
        else:
            return JSONResponse({"error": "Provide file or camera_source"}, status_code=400)

        # Convert bytes to np array for InsightFace
        img = Image.open(io.BytesIO(img_bytes)).convert("RGB")
        np_img = np.array(img)
        faces = app.get(np_img)
        if not faces:
            return JSONResponse({"error": "No face detected in image"}, status_code=400)
        if not face_db:
            return JSONResponse({"error": "Gallery is empty or embeddings/metadata missing"}, status_code=404)

        matches = []
        for face in faces:
            emb = face.embedding
            box = [int(v) for v in face.bbox]
            landmarks = getattr(face, "kps", None)  # shape (106, 2) or (5, 2) or (68, 2)
            
            # ------ Blink Detection ------
            is_blink = None
            avg_ear = None
            if known_webcam and landmarks is not None and len(landmarks) >= 96:
                left_eye = [landmarks[i] for i in LEFT_EYE_INDICES]
                right_eye = [landmarks[i] for i in RIGHT_EYE_INDICES]
                left_ear = eye_aspect_ratio(left_eye)
                right_ear = eye_aspect_ratio(right_eye)
                avg_ear = (left_ear + right_ear) / 2
                is_blink = avg_ear < 0.21  # Threshold: tune as needed
            # Else: leave blink/ear as None for file uploads

            # Find best match from gallery
            best_similarity = -1
            best_name = None
            best_info = None
            for name, db_emb, info in face_db:
                sim = float(np.dot(emb, db_emb) / (np.linalg.norm(emb) * np.linalg.norm(db_emb)))
                if sim > best_similarity:
                    best_similarity = sim
                    best_name = name
                    best_info = info

            match_info = {
                "name": best_name,
                "similarity": best_similarity,
                "info": best_info,
                "box": box
            }
            if is_blink is not None:
                match_info["blink"] = is_blink
                match_info["ear"] = avg_ear

            matches.append(match_info)

        results = sorted(matches, key=lambda x: x["similarity"], reverse=True)[:top_k]
        return {"matches": results}

    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)
