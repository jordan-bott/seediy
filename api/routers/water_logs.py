from fastapi import (
    Depends,
    HTTPException,
    APIRouter,
)

from typing import List
from fastapi.security import OAuth2PasswordBearer
from queries.water_logs import WaterQueries, WaterIn, WaterOut

import jwt
import os

router = APIRouter()
oauth2scheme = OAuth2PasswordBearer(tokenUrl="token")
JWT_KEY = os.environ["JWT_KEY"]


@router.post("/api/water", response_model=WaterOut | dict)
def add_water_log(
    info: WaterIn,
    logs: WaterQueries = Depends(),
    token: str = Depends(oauth2scheme),
):
    user = jwt.decode(token, JWT_KEY, algorithms=["HS256"])
    query = logs.create(info, user["id"])
    if isinstance(query, dict):
        raise HTTPException(status_code=400, detail="Bad Query")
    else:
        return query


@router.delete("/api/water/{id}", response_model=bool | dict)
def delete_water_log(
    id: int,
    logs: WaterQueries = Depends(),
    token: str = Depends(oauth2scheme),
):
    user = jwt.decode(token, JWT_KEY, algorithms=["HS256"])
    query = logs.delete(id, user["id"])
    if isinstance(query, dict):
        raise HTTPException(status_code=400, detail="Bad Query")
    else:
        return query


@router.get("/api/user/{user_id}/water", response_model=List[WaterOut] | dict)
def water_logs_by_user(
    logs: WaterQueries = Depends(),
    token: str = Depends(oauth2scheme),
):
    user = jwt.decode(token, JWT_KEY, algorithms=["HS256"])
    query = logs.get_by_user(user["id"])
    if isinstance(query, dict):
        raise HTTPException(status_code=400, detail="Bad Query")
    else:
        return query
