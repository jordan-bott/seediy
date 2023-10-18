from fastapi import (
    Depends,
    HTTPException,
    status,
    APIRouter,
)

from pydantic import BaseModel
from datetime import date
from queries.auth import (
    UserIn,
    UserUpdateIn,
    UserPasswordIn,
    UserOut,
    UserOutPass,
    UserQueries,
)
from passlib.hash import bcrypt
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm


import jwt
import requests
import json
import os


class UserEntry(BaseModel):
    username: str
    email: str
    password: str
    password_conf: str
    zipcode: str
    first_frost: date
    last_frost: date


class UserUpdateEntry(BaseModel):
    username: str
    email: str
    zipcode: str
    first_frost: date
    last_frost: date


class PasswordUpdateEntry(BaseModel):
    password: str
    password_conf: str


oauth2scheme = OAuth2PasswordBearer(tokenUrl="token")

JWT_KEY = os.environ["JWT_KEY"]

router = APIRouter()


@router.post("/token")
async def generate_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    users: UserQueries = Depends(),
):
    user = users.get(form_data.username)
    if bcrypt.verify(form_data.password, user.password_hash):
        user_dict = user.dict()
        del user_dict["password_hash"]
        token = jwt.encode(user_dict, JWT_KEY)
        return {"access_token": token, "token_type": "bearer"}
    else:
        return {"error": "token not created"}


@router.post("/api/users", response_model=UserOutPass)
async def create_user(
    info: UserEntry,
    users: UserQueries = Depends(),
) -> UserOutPass:
    if info.password == info.password_conf:
        hashed_pass = bcrypt.hash(info.password)
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Passwords do not match",
        )

    # city/state for zipcode
    z_url = f"http://ZiptasticAPI.com/{info.zipcode}"
    z_response = requests.get(z_url)
    z_dict = z_response.json()

    # Rapid API Plant Hardiness Zone
    zipcode = info.zipcode
    r_url = f"https://plant-hardiness-zone.p.rapidapi.com/zipcodes/{zipcode}"
    headers = {
        "X-RapidAPI-Key": os.environ["RAPID_API_KEY"],
        "X-RapidAPI-Host": "plant-hardiness-zone.p.rapidapi.com",
    }

    rapid_response = requests.get(r_url, headers=headers)
    zone_dict = rapid_response.json()

    # OpenWeather Lat & Lon
    ow_params = {
        "q": f"{z_dict['city']},{z_dict['state']},{z_dict['country']}",
        "limit": 1,
        "appid": os.environ["OPEN_WEATHER_API_KEY"],
    }
    ow_url = "http://api.openweathermap.org/geo/1.0/direct"
    ow_response = requests.get(ow_url, params=ow_params)
    ow_content = json.loads(ow_response.content)

    user_info = UserIn(
        type="user",
        username=info.username,
        email=info.email,
        password_hash=hashed_pass,
        zipcode=info.zipcode,
        lon=ow_content[0]["lon"],
        lat=ow_content[0]["lat"],
        zone=zone_dict["hardiness_zone"],
        first_frost=info.first_frost,
        last_frost=info.last_frost,
    )
    user = users.create(user_info)
    return user


@router.post("/api/users/admin", response_model=UserOutPass)
async def create_admin(
    info: UserEntry,
    users: UserQueries = Depends(),
) -> UserOutPass:
    if info.password == info.password_conf:
        hashed_pass = bcrypt.hash(info.password)
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Passwords do not match",
        )

    # city/state for zipcode
    z_url = f"http://ZiptasticAPI.com/{info.zipcode}"
    z_response = requests.get(z_url)
    z_dict = z_response.json()

    # Rapid API Plant Hardiness Zone
    zipcode = info.zipcode
    r_url = f"https://plant-hardiness-zone.p.rapidapi.com/zipcodes/{zipcode}"
    headers = {
        "X-RapidAPI-Key": os.environ["RAPID_API_KEY"],
        "X-RapidAPI-Host": "plant-hardiness-zone.p.rapidapi.com",
    }

    rapid_response = requests.get(r_url, headers=headers)
    zone_dict = rapid_response.json()

    # OpenWeather Lat & Lon
    ow_params = {
        "q": f"{z_dict['city']},{z_dict['state']},{z_dict['country']}",
        "limit": 1,
        "appid": os.environ["OPEN_WEATHER_API_KEY"],
    }
    ow_url = "http://api.openweathermap.org/geo/1.0/direct"
    ow_response = requests.get(ow_url, params=ow_params)
    ow_content = json.loads(ow_response.content)

    user_info = UserIn(
        type="admin",
        username=info.username,
        email=info.email,
        password_hash=hashed_pass,
        zipcode=info.zipcode,
        lon=ow_content[0]["lon"],
        lat=ow_content[0]["lat"],
        zone=zone_dict["hardiness_zone"],
        first_frost=info.first_frost,
        last_frost=info.last_frost,
    )
    user = users.create(user_info)
    return user


@router.get("/api/users", response_model=UserOut | dict)
def get_user(token: str = Depends(oauth2scheme)):
    try:
        return jwt.decode(token, JWT_KEY, algorithms=["HS256"])
    except Exception:
        return {"error": "no token found"}


@router.put("/api/users/{user_id}", response_model=UserOut | dict)
def update_user(
    user_id: int,
    info: UserUpdateEntry,
    users: UserQueries = Depends(),
    token: str = Depends(oauth2scheme),
):
    user = jwt.decode(token, JWT_KEY, algorithms=["HS256"])
    if user["id"] == user_id:
        if user["zipcode"] != info.zipcode:
            # city/state for zipcode
            z_url = f"http://ZiptasticAPI.com/{info.zipcode}"
            z_response = requests.get(z_url)
            z_dict = z_response.json()

            # Rapid API Plant Hardiness Zone
            z = info.zipcode
            r_url = f"https://plant-hardiness-zone.p.rapidapi.com/zipcodes/{z}"
            headers = {
                "X-RapidAPI-Key": os.environ["RAPID_API_KEY"],
                "X-RapidAPI-Host": "plant-hardiness-zone.p.rapidapi.com",
            }

            rapid_response = requests.get(r_url, headers=headers)
            zone_dict = rapid_response.json()

            # OpenWeather Lat & Lon
            ow_params = {
                "q": f"{z_dict['city']},{z_dict['state']},{z_dict['country']}",
                "limit": 1,
                "appid": os.environ["OPEN_WEATHER_API_KEY"],
            }
            ow_url = "http://api.openweathermap.org/geo/1.0/direct"
            ow_response = requests.get(ow_url, params=ow_params)
            ow_content = json.loads(ow_response.content)

            user_info = UserUpdateIn(
                id=user["id"],
                username=info.username,
                email=info.email,
                zipcode=info.zipcode,
                lon=ow_content[0]["lon"],
                lat=ow_content[0]["lat"],
                zone=zone_dict["hardiness_zone"],
                first_frost=info.first_frost,
                last_frost=info.last_frost,
            )
            query = users.update(user_info)
            if isinstance(query, dict):
                raise HTTPException(status_code=400, detail="Bad Query")
            else:
                return query
        else:
            user_info = UserUpdateIn(
                id=user["id"],
                username=info.username,
                email=info.email,
                zipcode=info.zipcode,
                lon=user["lon"],
                lat=user["lat"],
                zone=user["zone"],
                first_frost=info.first_frost,
                last_frost=info.last_frost,
            )
            query = users.update(user_info)
            if isinstance(query, dict):
                raise HTTPException(status_code=400, detail="Bad Query")
            else:
                return query
    else:
        return {"error": "not authorized to update that user"}


@router.put("/api/users/{user_id}/password", response_model=UserOut | dict)
def update_password(
    user_id: int,
    info: PasswordUpdateEntry,
    users: UserQueries = Depends(),
    token: str = Depends(oauth2scheme),
):
    user = jwt.decode(token, JWT_KEY, algorithms=["HS256"])
    if user["id"] == user_id:
        if info.password == info.password_conf:
            password_hash = bcrypt.hash(info.password)
            data = UserPasswordIn(id=user_id, password_hash=password_hash)
            query = users.update_password(data)
            if isinstance(query, dict):
                raise HTTPException(status_code=400, detail="Bad Query")
            else:
                return query
    else:
        return {"error": "not authorized to update that user"}


@router.put("/api/users/{user_id}/admin", response_model=UserOut | dict)
def update_to_admin(
    user_id: int,
    users: UserQueries = Depends(),
    token: str = Depends(oauth2scheme),
):
    user = jwt.decode(token, JWT_KEY, algorithms=["HS256"])
    if user["type"] == "admin":
        query = users.to_admin(user_id)
        if isinstance(query, dict):
            raise HTTPException(status_code=400, detail="Bad Query")
        else:
            return query
    else:
        return {"error": "not authorized to upgrade this user to admin"}
