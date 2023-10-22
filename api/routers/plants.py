from fastapi import (
    Depends,
    HTTPException,
    APIRouter,
)
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
