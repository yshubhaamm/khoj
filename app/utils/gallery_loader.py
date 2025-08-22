# app/core/gallery_loader.py
import os
import json
import numpy as np

face_db = {}  # { name: embedding_vector }

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # goes to app/
GALLERY_PATH = os.path.join(BASE_DIR, "gallery")

def load_gallery_embeddings():
    global face_db
    metadata_path = os.path.join(GALLERY_PATH, "metadata.json")
    embeddings_path = os.path.join(GALLERY_PATH, "face_embeddings.npy")

    if not os.path.exists(metadata_path) or not os.path.exists(embeddings_path):
        print(f"❌ No metadata.json or embeddings.npy found in {GALLERY_PATH}")
        return

    with open(metadata_path, "r") as f:
        metadata = json.load(f)

    embeddings = np.load(embeddings_path)

    for idx, person in enumerate(metadata):
        name = person.get("name", f"person_{idx}")
        face_db[name] = embeddings[idx]

    print(f"✅ Loaded {len(face_db)} gallery faces into memory from {GALLERY_PATH}")
