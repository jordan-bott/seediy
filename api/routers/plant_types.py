from fastapi import (
    Depends,
    HTTPException,
    APIRouter,
)
from typing import List
from fastapi.security import OAuth2PasswordBearer
from queries.plant_types import PlantTypeQueries, PlantTypeIn, PlantTypeOut

import jwt
import os

router = APIRouter()
oauth2scheme = OAuth2PasswordBearer(tokenUrl="token")
JWT_KEY = os.environ["JWT_KEY"]


@router.post("/api/planttype", response_model=PlantTypeOut | dict)
def add_plant_type(
    info: PlantTypeIn,
    types: PlantTypeQueries = Depends(),
    token: str = Depends(oauth2scheme),
):
    user = jwt.decode(token, JWT_KEY, algorithms=["HS256"])
    query = types.create(info, user["id"])
    if isinstance(query, dict):
        raise HTTPException(status_code=400, detail="Bad Query")
    else:
        return query


@router.delete("/api/planttype/{id}", response_model=bool | dict)
def delete_plant_type(
    id: int,
    types: PlantTypeQueries = Depends(),
    token: str = Depends(oauth2scheme),
):
    user = jwt.decode(token, JWT_KEY, algorithms=["HS256"])
    query = types.delete(id, user["id"])
    if isinstance(query, dict):
        raise HTTPException(status_code=400, detail="Bad Query")
    else:
        return query


@router.get(
    "/api/user/{user_id}/planttype", response_model=List[PlantTypeOut] | dict
)
def plant_type_by_user(
    types: PlantTypeQueries = Depends(),
    token: str = Depends(oauth2scheme),
):
    user = jwt.decode(token, JWT_KEY, algorithms=["HS256"])
    query = types.get_by_user(user["id"])
    if isinstance(query, dict):
        raise HTTPException(status_code=400, detail="Bad Query")
    else:
        return query
