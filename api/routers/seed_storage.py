from fastapi import (
    Depends,
    HTTPException,
    APIRouter,
)

from typing import List
from fastapi.security import OAuth2PasswordBearer
from queries.seed_storage import (
    SeedStorageIn,
    SeedStorageOut,
    SeedStorageQueries,
)


import jwt
import os

router = APIRouter()
oauth2scheme = OAuth2PasswordBearer(tokenUrl="token")
JWT_KEY = os.environ["JWT_KEY"]


@router.post("/api/seedstorage", response_model=SeedStorageOut | dict)
def add_seed_storage(
    info: SeedStorageIn,
    repo: SeedStorageQueries = Depends(),
    token: str = Depends(oauth2scheme),
):
    user = jwt.decode(token, JWT_KEY, algorithms=["HS256"])
    query = repo.create(info, user["id"])
    if isinstance(query, dict):
        raise HTTPException(status_code=400, detail="Bad Query")
    else:
        return query


@router.delete("/api/seedstorage/{id}", response_model=bool | dict)
def delete_plant_type(
    id: int,
    repo: SeedStorageQueries = Depends(),
    token: str = Depends(oauth2scheme),
):
    user = jwt.decode(token, JWT_KEY, algorithms=["HS256"])
    query = repo.delete(id, user["id"])
    if isinstance(query, dict):
        raise HTTPException(status_code=400, detail="Bad Query")
    else:
        return query


@router.get(
    "/api/user/{user_id}/seedstorage",
    response_model=List[SeedStorageOut] | dict,
)
def seed_storage_by_user(
    repo: SeedStorageQueries = Depends(),
    token: str = Depends(oauth2scheme),
):
    user = jwt.decode(token, JWT_KEY, algorithms=["HS256"])
    query = repo.get_by_user(user["id"])
    if isinstance(query, dict):
        raise HTTPException(status_code=400, detail="Bad Query")
    else:
        return query
