from fastapi import (
    Depends,
    HTTPException,
    APIRouter,
)
from typing import List
from fastapi.security import OAuth2PasswordBearer
from queries.plants import PlantQueries, PlantsIn, PlantsOut
from queries.seeds import SeedQueries

import jwt
import os

router = APIRouter()
oauth2scheme = OAuth2PasswordBearer(tokenUrl="token")
JWT_KEY = os.environ["JWT_KEY"]


@router.post("/api/plants", response_model=PlantsOut | dict)
def add_plant(
    info: PlantsIn,
    plants: PlantQueries = Depends(),
    seeds: SeedQueries = Depends(),
    token: str = Depends(oauth2scheme),
):
    user = jwt.decode(token, JWT_KEY, algorithms=["HS256"])
    plant_query = plants.create(info, user["id"])
    if isinstance(plant_query, dict):
        raise HTTPException(status_code=400, detail="Bad Plant Query")
    seed_query = seeds.planted(plant_query.seed_id)
    if isinstance(seed_query, dict):
        raise HTTPException(status_code=400, detail="Bad Seed Query")
    else:
        return plant_query


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


@router.get(
    "/api/users/{user_id}/plants/planted",
    response_model=List[PlantsOut] | dict,
)
def planted_plants_by_user(
    plants: PlantQueries = Depends(),
    token: str = Depends(oauth2scheme),
):
    user = jwt.decode(token, JWT_KEY, algorithms=["HS256"])
    query = plants.planted_by_user(user["id"])
    if isinstance(query, dict):
        raise HTTPException(status_code=400, detail="Bad Query")
    else:
        return query


@router.delete("/api/plants/{id}", response_model=bool | dict)
def delete_seed(
    id: int,
    plants: PlantQueries = Depends(),
    seeds: SeedQueries = Depends(),
    token: str = Depends(oauth2scheme),
):
    user = jwt.decode(token, JWT_KEY, algorithms=["HS256"])
    plant_query = plants.delete(id, user["id"])
    if isinstance(plant_query, dict):
        raise HTTPException(status_code=400, detail="Bad Plant Query")
    seed_query = seeds.not_planted(id)
    if isinstance(seed_query, dict):
        raise HTTPException(status_code=400, detail="Bad Seed Query")
    else:
        return plant_query


@router.put("/api/plants/{id}/unplant", response_model=PlantsOut | dict)
def unplant(
    id: int,
    user_id: int,
    plants: PlantQueries = Depends(),
    seeds: SeedQueries = Depends(),
    token: str = Depends(oauth2scheme),
):
    user = jwt.decode(token, JWT_KEY, algorithms=["HS256"])
    if user["id"] == user_id:
        print("in the if")
        plant_query = plants.unplant(id)
        if isinstance(plant_query, dict):
            raise HTTPException(status_code=400, detail="Bad Plant Query")
        seed_query = seeds.not_planted(plant_query.seed_id)
        if isinstance(seed_query, dict):
            raise HTTPException(status_code=400, detail="Bad Seed Query")
        else:
            return plant_query
    else:
        return {"error": "not authorized to update this plant"}
