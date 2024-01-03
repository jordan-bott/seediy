from fastapi import (
    Depends,
    HTTPException,
    APIRouter,
)

from typing import List
from fastapi.security import OAuth2PasswordBearer
from queries.instaseeds import InstaseedQueries, InstaseedIn, InstaseedOut

import jwt
import os

router = APIRouter()
oauth2scheme = OAuth2PasswordBearer(tokenUrl="token")
JWT_KEY = os.environ["JWT_KEY"]


@router.post("/api/instaseed", response_model=InstaseedOut | dict)
def add_instaseed(
    info: InstaseedIn,
    repo: InstaseedQueries = Depends(),
    token: str = Depends(oauth2scheme),
):
    user = jwt.decode(token, JWT_KEY, algorithms=["HS256"])
    query = repo.create(info, user["id"])
    if isinstance(query, dict):
        raise HTTPException(status_code=400, detail="Bad Query")
    else:
        return query


@router.get(
    "/api/users/{user_id}/instaseeds", response_model=List[InstaseedOut] | dict
)
def get_by_user(
    user_id: int,
    repo: InstaseedQueries = Depends(),
):
    query = repo.get_by_user(user_id)
    if isinstance(query, dict):
        raise HTTPException(status_code=400, detail="Bad Query")
    else:
        return query


@router.delete("/api/instaseeds/{id}", response_model=bool | dict)
def delete(
    id: int,
    repo: InstaseedQueries = Depends(),
    token: str = Depends(oauth2scheme),
):
    user = jwt.decode(token, JWT_KEY, algorithms=["HS256"])
    query = repo.delete(id, user["id"])
    if isinstance(query, dict):
        raise HTTPException(status_code=400, detail="Bad Query")
    else:
        return query


@router.put("/api/instaseeds/{id}", response_model=bool | dict)
def update(
    id: int,
    info: InstaseedIn,
    repo: InstaseedQueries = Depends(),
    token: str = Depends(oauth2scheme),
):
    user = jwt.decode(token, JWT_KEY, algorithms=["HS256"])
    query = repo.update(info, id, user["id"])
    if isinstance(query, dict):
        raise HTTPException(status_code=400, detail="Bad Query")
    else:
        return query
