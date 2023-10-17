from pydantic import BaseModel

# from queries.pool import pool


class UserUpdate(BaseModel):
    username: str
    email: str
    zipcode: str
