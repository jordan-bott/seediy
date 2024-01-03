from fastapi import (
    Depends,
    HTTPException,
    APIRouter,
)

from typing import List
from fastapi.security import OAuth2PasswordBearer
from queries.blog_comments import (
    CommentQueries,
    CommentIn,
    CommentOut,
    CommentUpdateIn,
)

import jwt
import os

router = APIRouter()
oauth2scheme = OAuth2PasswordBearer(tokenUrl="token")
JWT_KEY = os.environ["JWT_KEY"]


@router.post("/api/comments", response_model=CommentOut | dict)
def create_comment(
    info: CommentIn,
    comments: CommentQueries = Depends(),
    token: str = Depends(oauth2scheme),
):
    user = jwt.decode(token, JWT_KEY, algorithms=["HS256"])
    query = comments.create(info, user["id"])
    if isinstance(query, dict):
        raise HTTPException(status_code=400, detail="Bad Query")
    else:
        return query


@router.get("/api/blogs/{id}/comments", response_model=List[CommentOut] | dict)
def comments_by_blog(
    id: int,
    comments: CommentQueries = Depends(),
):
    query = comments.get_by_blog(id)
    if isinstance(query, dict):
        raise HTTPException(status_code=400, detail="Bad Query")
    else:
        return query


@router.delete("/api/comments/{id}", response_model=bool | dict)
def delete_comment(
    id: int,
    user_id: int,
    comments: CommentQueries = Depends(),
    token: str = Depends(oauth2scheme),
):
    user = jwt.decode(token, JWT_KEY, algorithms=["HS256"])
    if user_id == user["id"]:
        query = comments.delete(id, user["id"])
        if isinstance(query, dict):
            raise HTTPException(status_code=400, detail="Bad Query")
        else:
            return query
    else:
        return {"error": "not authorized to delete that user"}


@router.delete("/api/admin/comments/{id}", response_model=bool | dict)
def admin_delete_comment(
    id: int,
    comments: CommentQueries = Depends(),
    token: str = Depends(oauth2scheme),
):
    user = jwt.decode(token, JWT_KEY, algorithms=["HS256"])
    if user["type"] == "admin":
        query = comments.admin_delete(id)
        if isinstance(query, dict):
            raise HTTPException(status_code=400, detail="Bad Query")
        else:
            return query
    else:
        return {"error": "not authorized to delete that user"}


@router.put("/api/comments/{id}", response_model=CommentOut | dict)
def update_comment(
    id: int,
    info: CommentUpdateIn,
    comments: CommentQueries = Depends(),
    token: str = Depends(oauth2scheme),
):
    user = jwt.decode(token, JWT_KEY, algorithms=["HS256"])
    if info.user_id == user["id"]:
        query = comments.update(info, id)
        if isinstance(query, dict):
            raise HTTPException(status_code=400, detail="Bad Query")
        else:
            return query
    else:
        return {"error": "not authorized to update that user"}
