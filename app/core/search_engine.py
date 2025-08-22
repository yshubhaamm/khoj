import faiss
import numpy as np
import pickle
import json
import os

# FAISS index parameters
DIM = 512  # must match your embedding size
index = faiss.IndexFlatL2(DIM)
metadata = []

# File paths
EMBEDDINGS_PATH = os.path.join(os.path.dirname(__file__), "../../face_embeddings.npy")
METADATA_JSON_PATH = os.path.join(os.path.dirname(__file__), "../../metadata.json")
PICKLE_META_PATH = os.path.join(os.path.dirname(__file__), "../../meta.pkl")

# Load pre-generated embeddings and metadata at startup
if os.path.exists(EMBEDDINGS_PATH) and os.path.exists(METADATA_JSON_PATH):
    print("[INFO] Loading pre-generated embeddings and metadata...")
    known_embeddings = np.load(EMBEDDINGS_PATH)

    with open(METADATA_JSON_PATH, "r") as f:
        metadata = json.load(f)

    if known_embeddings.shape[0] > 0:
        index.add(known_embeddings.astype(np.float32))
    print(f"[INFO] Loaded {len(metadata)} faces into FAISS index.")
else:
    print("[WARNING] No pre-generated embeddings found. Index is empty.")
    known_embeddings = np.array([])

# Save metadata as pickle for persistence
with open(PICKLE_META_PATH, "wb") as f:
    pickle.dump(metadata, f)


def add_to_index(embedding, meta):
    """
    Add a new embedding to the FAISS index and metadata list.
    """
    global index, metadata
    index.add(np.expand_dims(embedding, 0).astype(np.float32))
    metadata.append(meta)

    with open(PICKLE_META_PATH, "wb") as f:
        pickle.dump(metadata, f)


def query_index(query_emb, top_k=5):
    """
    Search for the closest embeddings in the FAISS index.
    Returns top_k matches with confidence scores.
    """
    if index.ntotal == 0:
        return [{"error": "No embeddings in index"}]

    D, I = index.search(np.expand_dims(query_emb, 0).astype(np.float32), top_k)

    results = []
    for d, i in zip(D[0], I[0]):
        if i < len(metadata):
            confidence = max(0.0, 1 - (d / 2))  # normalize L2 distance to similarity score
            results.append({
                "score": round(float(confidence * 100), 2),  # percentage
                **metadata[i]
            })

    return results
