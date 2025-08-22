import os
import json
import numpy as np
from PIL import Image
import insightface

# ---- USER-DEFINED CUSTOM INFO ----
# Map folder name to your actual info string:
custom_info = {
    "Virat Kohli": "Indian cricketer, Age 36, Delhi",
    "Akshay Kumar": "Bollywood actor, Age 56, Mumbai",
    "Alexandra Daddario": "Hollywood actress, Age 38, USA",
    "Charlize Theron": "South African actress, Age 50, Los Angeles",
    "Amitabh Bachchan": "Indian legend, Age 82, Mumbai",
    "Alia Bhatt": "Bollywood actress, Age 31, Mumbai",
    "Andy Samberg": "American actor & comedian, Age 46, California",
    "Anushka Sharma": "Bollywood actress, Age 37, Mumbai",
    "Billie Eilish": "American singer-songwriter, Age 23, Los Angeles",
    "Brad Pitt": "Hollywood actor, Age 61, Los Angeles",
    "Camila Cabello": "Cuban-American singer, Age 28, Miami",
    "Claire Holt": "Australian actress, Age 36, Los Angeles",
    "Courtney Cox": "American actress, Age 61, Malibu",
    "Dwayne Johnson": "American actor & former wrestler, Age 53, Florida",
    "Elizabeth Olsen": "American actress, Age 36, Los Angeles",
    "Ellen DeGeneres": "American TV host & comedian, Age 67, California",
    "Henry Cavill": "British actor, Age 42, London",
    "Hrithik Roshan": "Bollywood actor, Age 51, Mumbai",
    "Hugh Jackman": "Australian actor, Age 56, New York",
    "Jessica Alba": "American actress & entrepreneur, Age 44, Los Angeles",
    "Lisa Kudrow": "American actress, Age 62, Los Angeles",
    "Margot Robbie": "Australian actress, Age 35, Los Angeles",
    "Natalie Portman": "Israeli-American actress, Age 44, Los Angeles",
    "Priyanka Chopra": "Indian actress & singer, Age 43, Los Angeles",
    "Robert Downey_Jr": "Hollywood actor, Age 60, Malibu",
    "Roger Federer": "Swiss tennis legend, Age 44, Switzerland",
    "Tom Cruise": "Hollywood actor, Age 63, Florida",
    "Vijay Deverakonda": "Indian actor, Age 36, Hyderabad",
    "Zac Efron": "Hollywood actor, Age 38, California",
    "Hitesh": "BTech student, Age 20, Karnal, Haryana",
    "Shubham": "BTech student, Age 21, Karnal, Haryana",
    "Marmik": "BTech student, Age 20, Chandigarh",
    "Kashyap": "BTech student, Age 19, Panipat, Haryana"
}
default_info = "Person info not provided"

# Paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
GALLERY_DIR = os.path.join(BASE_DIR, "gallery")
METADATA_PATH = os.path.join(GALLERY_DIR, "metadata.json")
EMBEDDINGS_PATH = os.path.join(GALLERY_DIR, "face_embeddings.npy")

# Load InsightFace model
MODEL_DIR = os.path.join(BASE_DIR, "ml", "models", "insightface")  # Adjust if needed
app = insightface.app.FaceAnalysis(name="antelopev2", root=MODEL_DIR)
app.prepare(ctx_id=-1, det_size=(640, 640))  # ctx_id=-1 for CPU only

def generate_embeddings():
    metadata = []
    embeddings = []
    index_counter = 0

    for person_name in os.listdir(GALLERY_DIR):
        person_folder = os.path.join(GALLERY_DIR, person_name)
        if not os.path.isdir(person_folder):
            continue

        for img_file in os.listdir(person_folder):
            img_path = os.path.join(person_folder, img_file)

            if not img_file.lower().endswith(('.jpg', '.jpeg', '.png')):
                continue

            print(f"[INFO] Processing {img_path}")
            try:
                img = np.array(Image.open(img_path).convert("RGB"))
                faces = app.get(img)

                if not faces:
                    print(f"[WARN] No face found in {img_path}, skipping.")
                    continue

                face = faces[0]
                embeddings.append(face.embedding.astype(np.float32))

                # Use custom info if available, else default
                info = custom_info.get(person_name, default_info)
                metadata.append({
                    "name": person_name,
                    "info": info,
                    "embedding_index": index_counter
                })
                index_counter += 1

            except Exception as e:
                print(f"[ERROR] Failed to process {img_path}: {e}")

    # Save results
    np.save(EMBEDDINGS_PATH, np.array(embeddings))
    with open(METADATA_PATH, "w", encoding="utf-8") as f:
        json.dump(metadata, f, indent=4)

    print(f"[DONE] Saved {len(embeddings)} embeddings to {EMBEDDINGS_PATH}")
    print(f"[DONE] Saved metadata to {METADATA_PATH}")

if __name__ == "__main__":
    print("[INFO] Generating gallery embeddings with InsightFace...")
    generate_embeddings()
