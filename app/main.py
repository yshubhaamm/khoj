from fastapi import FastAPI
from app.api import face_routes
from app.utils.gallery_loader import load_gallery_embeddings
from fastapi.middleware.cors import CORSMiddleware

# Socialscan imports — using sync version
from socialscan.util import Platforms, sync_execute_queries

app = FastAPI(title="Khoj AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],  # Update if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(face_routes.router, prefix="/face", tags=["Face"])

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.on_event("startup")
async def startup_event():
    load_gallery_embeddings()

@app.get("/social-check")
def social_check(username: str):
    platforms = [
        Platforms.TWITTER,
        Platforms.INSTAGRAM,
        Platforms.GITHUB,
    ]
    results = sync_execute_queries([username], platforms)
    return [
        {
            "platform": r.platform.name,
            "exists": not r.available,    # True if username already taken
            "message": r.message,
            "valid": r.valid,
            "available": r.available,
            "success": r.success,
            "link": r.link,
        }
        for r in results
    ]
