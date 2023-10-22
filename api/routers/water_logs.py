from fastapi import (
    Depends,
    HTTPException,
    APIRouter,
)


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
