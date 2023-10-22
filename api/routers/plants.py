from fastapi import (
    Depends,
    HTTPException,
    APIRouter,
)
from typing import List
from fastapi.security import OAuth2PasswordBearer
from queries.plants import PlantQueries, PlantsIn, PlantsOut

import jwt
import os

router = APIRouter()
oauth2scheme = OAuth2PasswordBearer(tokenUrl="token")
JWT_KEY = os.environ["JWT_KEY"]


@router.post("/api/plants", response_model=PlantsOut | dict)
def add_plant(
    info: PlantsIn,
    plants: PlantQueries = Depends(),
    token: str = Depends(oauth2scheme),
):
    user = jwt.decode(token, JWT_KEY, algorithms=["HS256"])
    query = plants.create(info, user["id"])
    if isinstance(query, dict):
        raise HTTPException(status_code=400, detail="Bad Query")
    else:
        return query


@router.put("/api/plants/{id}", response_model=PlantsOut | dict)
def update_plant(
    id: int,
    user_id: int,
    info: PlantsIn,
    plants: PlantQueries = Depends(),
    token: str = Depends(oauth2scheme),
):
    user = jwt.decode(token, JWT_KEY, algorithms=["HS256"])
    if user["id"] == user_id:
        query = plants.update(info, id)
        if isinstance(query, dict):
            raise HTTPException(status_code=400, detail="Bad Query")
        else:
            return query
    else:
        return {"error": "not authorized to update that user"}


@router.get(
    "/api/users/{user_id}/plants", response_model=List[PlantsOut] | dict
)
def plants_by_user(
    plants: PlantQueries = Depends(),
    token: str = Depends(oauth2scheme),
):
    user = jwt.decode(token, JWT_KEY, algorithms=["HS256"])
    query = plants.by_user(user["id"])
    if isinstance(query, dict):
        raise HTTPException(status_code=400, detail="Bad Query")
    else:
        return query


@router.delete("/api/plants/{id}", response_model=bool | dict)
def delete_seed(
    id: int,
    plants: PlantQueries = Depends(),
    token: str = Depends(oauth2scheme),
):
    user = jwt.decode(token, JWT_KEY, algorithms=["HS256"])
    query = plants.delete(id, user["id"])
    if isinstance(query, dict):
        raise HTTPException(status_code=400, detail="Bad Query")
    else:
        return query
