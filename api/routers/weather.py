from fastapi import APIRouter, Depends

from fastapi.security import OAuth2PasswordBearer
import requests
import jwt
import os
import json

oauth2scheme = OAuth2PasswordBearer(tokenUrl="token")

JWT_KEY = os.environ["JWT_KEY"]

router = APIRouter()


@router.get("/api/weather")
def get_weather(
    token: str = Depends(oauth2scheme),
):
    user = jwt.decode(token, JWT_KEY, algorithms=["HS256"])

    params = {
        "lat": user["lat"],
        "lon": user["lon"],
        "appid": os.environ["OPEN_WEATHER_API_KEY"],
        "units": "imperial",
        "exclude": "minutely",
    }
    url = "https://api.openweathermap.org/data/3.0/onecall"
    response = requests.get(url, params=params)
    content = json.loads(response.content)
    return content


@router.get("/api/weather/{unix_time}")
def get_weather_for_time(
    unix_time: str,
    token: str = Depends(oauth2scheme),
):
    user = jwt.decode(token, JWT_KEY, algorithms=["HS256"])

    params = {
        "lat": user["lat"],
        "lon": user["lon"],
        "dt": unix_time,
        "appid": os.environ["OPEN_WEATHER_API_KEY"],
        "units": "imperial",
    }
    url = "https://api.openweathermap.org/data/3.0/onecall/timemachine"
    response = requests.get(url, params=params)
    content = json.loads(response.content)
    return content
