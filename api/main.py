from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import users, plant_types, seed_storage, seeds, plants, water_logs
import os

app = FastAPI()
app.include_router(users.router, tags=["Users"])
app.include_router(plant_types.router, tags=["Plant Types"])
app.include_router(seed_storage.router, tags=["Seed Storages"])
app.include_router(seeds.router, tags=["Seeds"])
app.include_router(plants.router, tags=["Plants"])
app.include_router(water_logs.router, tags=["Water Logs"])


app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
