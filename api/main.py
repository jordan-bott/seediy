from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from routers import auth
import os

app = FastAPI()
app.include_router(auth.router, tags=["Authentication"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


@app.post("/token")
async def token(form_data: OAuth2PasswordRequestForm = Depends()):
    return {"access_token": form_data.username + "token"}


@app.get("/")
async def index(token: str = Depends(oauth2_scheme)):
    return {"the_token": token}


app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
