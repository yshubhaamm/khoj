import insightface
import numpy as np
from PIL import Image
import io
import os

# Path to InsightFace models
MODEL_DIR = os.path.join(os.path.dirname(__file__), "models", "insightface")

# Initialize the model
app = insightface.app.FaceAnalysis(name="antelopev2", root=MODEL_DIR)
app.prepare(ctx_id=0, det_size=(640, 640))


def detect_and_crop(image_bytes):
    """
    Detect the first face in the image, return cropped face image and its embedding.
    """
    # Read and convert the uploaded image to NumPy array
    img = np.array(Image.open(io.BytesIO(image_bytes)).convert("RGB"))

    # Detect faces
    faces = app.get(img)
    if not faces:
        raise ValueError("No face detected")

    # Take first detected face
    face = faces[0]
    x1, y1, x2, y2 = face.bbox.astype(int)

    # Crop face
    crop = img[y1:y2, x1:x2]

    # Return both crop and precomputed embedding
    return crop, face.embedding.astype(np.float32)


def extract_embedding(face_img):
    """
    Extract embedding from a cropped face image (NumPy array).
    Only needed if you have a face crop without an embedding yet.
    """
    # Ensure it's a NumPy array
    if not isinstance(face_img, np.ndarray):
        raise TypeError("face_img must be a NumPy array")

    # Detect face again (only crop should be passed here)
    faces = app.get(face_img)
    if not faces:
        raise ValueError("No face found for embedding")

    return faces[0].embedding.astype(np.float32)
