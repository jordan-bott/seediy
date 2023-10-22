from fastapi import (
    Depends,
    HTTPException,
    APIRouter,
)
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
