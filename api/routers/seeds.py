from fastapi import (
    Depends,
    HTTPException,
    APIRouter,
)
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
