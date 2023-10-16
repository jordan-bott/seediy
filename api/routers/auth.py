from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)

from pydantic import BaseModel
from datetime import date
from queries.auth import UserIn, UserOutPass, UserQueries
from passlib.hash import bcrypt

import requests
import json
import os


class UserEntry(BaseModel):
    username: str
    email: str
    password: str
    password_conf: str
    zipcode: str
    city: str
    state: str
    first_frost: date
    last_frost: date


router = APIRouter()


@router.post("/api/users", response_model=UserOutPass)
async def create_user(
    info: UserEntry,
    request: Request,
    response: Response,
    users: UserQueries = Depends(),
) -> UserOutPass:
    if info.password == info.password_conf:
        hashed_pass = bcrypt.hash(info.password)
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Passwords do not match",
        )

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
        "q": f"{info.city},{info.state},US",
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


@router.get("/api/users", response_model=UserOutPass)
def get_user(user_id: int, users: UserQueries = Depends()) -> UserOutPass:
    user = users.get(user_id)
    return user
