from fastapi import (
    Depends,
    HTTPException,
    APIRouter,
)

from typing import List
from fastapi.security import OAuth2PasswordBearer
from queries.seeds import SeedQueries, SeedIn, SeedOut

import jwt
import os

router = APIRouter()
oauth2scheme = OAuth2PasswordBearer(tokenUrl="token")
JWT_KEY = os.environ["JWT_KEY"]


@router.post("/api/seeds", response_model=SeedOut | dict)
def add_seed(
    info: SeedIn,
    seeds: SeedQueries = Depends(),
    token: str = Depends(oauth2scheme),
):
    user = jwt.decode(token, JWT_KEY, algorithms=["HS256"])
    query = seeds.create(info, user["id"])
    if isinstance(query, dict):
        raise HTTPException(status_code=400, detail="Bad Query")
    else:
        return query


@router.get("/api/user/{user_id}/seeds", response_model=List[SeedOut] | dict)
def seeds_by_user(
    seeds: SeedQueries = Depends(),
    token: str = Depends(oauth2scheme),
):
    user = jwt.decode(token, JWT_KEY, algorithms=["HS256"])
    query = seeds.get_by_user(user["id"])
    if isinstance(query, dict):
        raise HTTPException(status_code=400, detail="Bad Query")
    else:
        return query


@router.put("/api/seeds/{id}", response_model=SeedOut | dict)
def update_seed(
    id: int,
    user_id: int,
    info: SeedIn,
    seeds: SeedQueries = Depends(),
    token: str = Depends(oauth2scheme),
):
    user = jwt.decode(token, JWT_KEY, algorithms=["HS256"])
    if user_id == user["id"]:
        query = seeds.update(info, id)
        if isinstance(query, dict):
            raise HTTPException(status_code=400, detail="Bad Query")
        else:
            return query
    else:
        return {"error": "not authorized to update that seed"}


@router.delete("/api/seeds/{id}", response_model=bool | dict)
def delete_seed(
    id: int,
    seeds: SeedQueries = Depends(),
    token: str = Depends(oauth2scheme),
):
    user = jwt.decode(token, JWT_KEY, algorithms=["HS256"])
    query = seeds.delete(id, user["id"])
    if isinstance(query, dict):
        raise HTTPException(status_code=400, detail="Bad Query")
    else:
        return query
