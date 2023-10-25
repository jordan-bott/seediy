from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import (
    users,
    plant_types,
    seed_storage,
    seeds,
    plants,
    water_logs,
    topics,
    instaseeds,
    likes,
    blogs,
    sprouts,
    blog_comments,
)
import os

app = FastAPI()
app.include_router(users.router, tags=["Users"])
app.include_router(plant_types.router, tags=["Plant Types"])
app.include_router(seed_storage.router, tags=["Seed Storages"])
app.include_router(seeds.router, tags=["Seeds"])
app.include_router(plants.router, tags=["Plants"])
app.include_router(water_logs.router, tags=["Water Logs"])
app.include_router(topics.router, tags=["Topics"])
app.include_router(instaseeds.router, tags=["Instaseeds"])
app.include_router(likes.router, tags=["Likes"])
app.include_router(blogs.router, tags=["Blogs"])
app.include_router(sprouts.router, tags=["Sprouts"])
app.include_router(blog_comments.router, tags=["Blog Comments"])


app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
