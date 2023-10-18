from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import users, plant_types
import os

app = FastAPI()
app.include_router(users.router, tags=["Users"])
app.include_router(plant_types.router, tags=["Plant Types"])


app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
