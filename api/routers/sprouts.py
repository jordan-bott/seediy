from fastapi import (
    Depends,
    HTTPException,
    APIRouter,
)

from typing import List
from fastapi.security import OAuth2PasswordBearer
from queries.sprouts import SproutQueries, SproutIn, SproutOut
from queries.users import UserQueries

import jwt
import os

router = APIRouter()
oauth2scheme = OAuth2PasswordBearer(tokenUrl="token")
JWT_KEY = os.environ["JWT_KEY"]


@router.post("/api/sprouts", response_model=SproutOut | dict)
def create_sprout(
    info: SproutIn,
    sprouts: SproutQueries = Depends(),
    users: UserQueries = Depends(),
    token: str = Depends(oauth2scheme),
):
    user = jwt.decode(token, JWT_KEY, algorithms=["HS256"])
    sprout_query = sprouts.create(info, user["id"])
    if isinstance(sprout_query, dict):
        raise HTTPException(status_code=400, detail="Bad Sprout Query")
    user_query = users.add_sprout(sprout_query.author_id)
    if isinstance(user_query, dict):
        raise HTTPException(status_code=400, detail="Bad User Query")
    else:
        return sprout_query


@router.get(
    "/api/blogs/{blog_id}/sprouts", response_model=List[SproutOut] | dict
)
def get_sprouts_by_blog(
    blog_id: int,
    sprouts: SproutQueries = Depends(),
):
    query = sprouts.get_by_blog(blog_id)
    if isinstance(query, dict):
        raise HTTPException(status_code=400, detail="Bad Query")
    else:
        return query


@router.delete("/api/sprouts/{id}", response_model=bool | dict)
def delete_sprout(
    id: int,
    user_id: int,
    sprouts: SproutQueries = Depends(),
    token: str = Depends(oauth2scheme),
):
    user = jwt.decode(token, JWT_KEY, algorithms=["HS256"])
    if user_id == user["id"]:
        query = sprouts.delete(id, user["id"])
        if isinstance(query, dict):
            raise HTTPException(status_code=400, detail="Bad Query")
        else:
            return query
    else:
        return {"error": "not authorized to remove that sprout"}


@router.get("/api/users/{id}/sprouts", response_model=list | dict)
def sprouts_by_user(
    id: int,
    sprouts: SproutQueries = Depends(),
    token: str = Depends(oauth2scheme),
):
    user = jwt.decode(token, JWT_KEY, algorithms=["HS256"])
    if id == user["id"]:
        query = sprouts.user_sprouts(id)
        if isinstance(query, dict):
            raise HTTPException(status_code=400, detail="Bad Query")
        else:
            return query
    else:
        return {"error": "not authorized to get those sprouts"}
