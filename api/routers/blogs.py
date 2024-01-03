from fastapi import (
    Depends,
    HTTPException,
    APIRouter,
)

from typing import List
from fastapi.security import OAuth2PasswordBearer
from queries.blogs import BlogQueries, BlogIn, BlogOut
from queries.users import UserQueries

import jwt
import os

router = APIRouter()
oauth2scheme = OAuth2PasswordBearer(tokenUrl="token")
JWT_KEY = os.environ["JWT_KEY"]


@router.post("/api/blogs", response_model=BlogOut | dict)
def add_blog(
    info: BlogIn,
    blogs: BlogQueries = Depends(),
    users: UserQueries = Depends(),
    token: str = Depends(oauth2scheme),
):
    user = jwt.decode(token, JWT_KEY, algorithms=["HS256"])
    blog_query = blogs.create(info, user["id"])
    if isinstance(blog_query, dict):
        raise HTTPException(status_code=400, detail="Bad Blog Query")
    user_query = users.add_blog(user["id"])
    if isinstance(user_query, dict):
        raise HTTPException(status_code=400, detail="Bad User Query")
    else:
        return blog_query


@router.get("/api/blogs", response_model=List[BlogOut] | dict)
def get_all_blogs(
    blogs: BlogQueries = Depends(),
):
    query = blogs.get_all()
    if isinstance(query, dict):
        raise HTTPException(status_code=400, detail="Bad Query")
    else:
        return query


@router.get("/api/users/{user_id}/blogs", response_model=List[BlogOut] | dict)
def get_user_blogs(
    user_id: int,
    blogs: BlogQueries = Depends(),
):
    query = blogs.get_by_user(user_id)
    if isinstance(query, dict):
        raise HTTPException(status_code=400, detail="Bad Query")
    else:
        return query


@router.delete("/api/blogs/{id}", response_model=bool | dict)
def delete_blog(
    id: int,
    user_id: int,
    blogs: BlogQueries = Depends(),
    token: str = Depends(oauth2scheme),
):
    user = jwt.decode(token, JWT_KEY, algorithms=["HS256"])
    if user_id == user["id"] or user["type"] == "admin":
        query = blogs.delete(id, user_id)
        if isinstance(query, dict):
            raise HTTPException(status_code=400, detail="Bad Query")
        else:
            return query
    else:
        return {"error": "not authorized to delete that blog"}
