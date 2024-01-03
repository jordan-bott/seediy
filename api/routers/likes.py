from fastapi import (
    Depends,
    HTTPException,
    APIRouter,
)


from fastapi.security import OAuth2PasswordBearer
from queries.likes import LikesQueries, LikesIn, LikesOut

import jwt
import os

router = APIRouter()
oauth2scheme = OAuth2PasswordBearer(tokenUrl="token")
JWT_KEY = os.environ["JWT_KEY"]


@router.post("/api/likes", response_model=LikesOut | dict)
def add_like(
    info: LikesIn,
    likes: LikesQueries = Depends(),
    token: str = Depends(oauth2scheme),
):
    user = jwt.decode(token, JWT_KEY, algorithms=["HS256"])
    query = likes.create(info, user["id"])
    if isinstance(query, dict):
        raise HTTPException(status_code=400, detail="Bad Query")
    else:
        return query


@router.delete("/api/likes/{post_id}", response_model=bool | dict)
def remove_like(
    post_id: int,
    likes: LikesQueries = Depends(),
    token: str = Depends(oauth2scheme),
):
    user = jwt.decode(token, JWT_KEY, algorithms=["HS256"])
    query = likes.unlike(post_id, user["id"])
    if isinstance(query, dict):
        raise HTTPException(status_code=400, detail="Bad Query")
    else:
        return query


@router.get("/api/post/{post_id}/likes", response_model=dict)
def get_likes_by_post(
    post_id: int,
    likes: LikesQueries = Depends(),
):
    query = likes.get_by_post(post_id)
    if isinstance(query, dict):
        raise HTTPException(status_code=400, detail="Bad Query")
    else:
        return {"likes": len(query)}
