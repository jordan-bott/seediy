from fastapi import (
    Depends,
    HTTPException,
    APIRouter,
)

from typing import List
from fastapi.security import OAuth2PasswordBearer
from queries.topics import TopicQueries, TopicIn, TopicOut

import jwt
import os

router = APIRouter()
oauth2scheme = OAuth2PasswordBearer(tokenUrl="token")
JWT_KEY = os.environ["JWT_KEY"]


@router.post("/api/topics", response_model=TopicOut | dict)
def create(
    info: TopicIn,
    topics: TopicQueries = Depends(),
    token: str = Depends(oauth2scheme),
):
    user = jwt.decode(token, JWT_KEY, algorithms=["HS256"])
    if user["type"] == "admin":
        query = topics.create(info)
        if isinstance(query, dict):
            raise HTTPException(status_code=400, detail="Bad Query")
        else:
            return query
    else:
        return {"error": "not authorized to create topics"}


@router.get("/api/topics", response_model=List[TopicOut] | dict)
def get_all(
    topics: TopicQueries = Depends(),
):
    query = topics.get_all()
    if isinstance(query, dict):
        raise HTTPException(status_code=400, detail="Bad Query")
    else:
        return query


@router.delete("/api/topics/{id}", response_model=bool | dict)
def delete(
    id: int,
    topics: TopicQueries = Depends(),
    token: str = Depends(oauth2scheme),
):
    user = jwt.decode(token, JWT_KEY, algorithms=["HS256"])
    if user["type"] == "admin":
        query = topics.delete(id)
        if isinstance(query, dict):
            raise HTTPException(status_code=400, detail="Bad Query")
        else:
            return query
    else:
        return {"error": "not authorized to delete topics"}
