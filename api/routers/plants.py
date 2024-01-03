from fastapi import (
    Depends,
    HTTPException,
    APIRouter,
)
from typing import List
from fastapi.security import OAuth2PasswordBearer
from queries.plants import PlantQueries, PlantsIn, PlantsOut, PlantsJoinOut
from queries.seeds import SeedQueries
from datetime import timedelta

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
    seed = seeds.get_one(info.seed_id)
    dth = timedelta(days=seed.days_to_harvest)
    harvest_date = info.date_planted + dth
    plant_query = plants.create(info, user["id"], harvest_date)
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
    info: PlantsIn,
    plants: PlantQueries = Depends(),
    seeds: SeedQueries = Depends(),
    token: str = Depends(oauth2scheme),
):
    user = jwt.decode(token, JWT_KEY, algorithms=["HS256"])
    seed = seeds.get_one(info.seed_id)
    dth = timedelta(days=seed.days_to_harvest)
    harvest_date = info.date_planted + dth
    query = plants.update(info, id, user["id"], harvest_date)
    if isinstance(query, dict):
        raise HTTPException(status_code=400, detail="Bad Query")
    else:
        return query


@router.get(
    "/api/users/{user_id}/plants", response_model=List[PlantsJoinOut] | dict
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
    response_model=List[PlantsJoinOut] | dict,
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
    plants: PlantQueries = Depends(),
    seeds: SeedQueries = Depends(),
    token: str = Depends(oauth2scheme),
):
    user = jwt.decode(token, JWT_KEY, algorithms=["HS256"])
    plant_query = plants.unplant(id, user["id"])
    if isinstance(plant_query, dict):
        raise HTTPException(status_code=400, detail="Bad Plant Query")
    seed_query = seeds.not_planted(plant_query.seed_id)
    if isinstance(seed_query, dict):
        raise HTTPException(status_code=400, detail="Bad Seed Query")
    else:
        return plant_query
