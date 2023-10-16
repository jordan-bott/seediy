from pydantic import BaseModel
from queries.pool import pool
from datetime import date


class UserIn(BaseModel):
    type: str
    username: str
    email: str
    password_hash: str
    zipcode: str
    lon: str
    lat: str
    zone: str
    first_frost: date
    last_frost: date


class UserOut(BaseModel):
    id: int
    type: str
    username: str
    email: str
    verified: bool
    posts: int
    sprouts: int
    date_created: str
    units: str
    zipcode: str
    lon: str
    lat: str
    zone: str
    first_frost: str
    last_frost: str
    high_temp: str
    low_temp: str


class LoginOut(BaseModel):
    username: str
    password_hash: str


class UserOutPass(UserOut):
    password_hash: str


class UserQueries:
    def user_pass_out(self, user):
        return UserOutPass(
            id=user[0],
            type=user[1],
            username=user[2],
            email=user[3],
            verified=user[4],
            posts=user[5],
            sprouts=user[6],
            date_created=str(user[7]),
            password_hash=user[8],
            units=user[9],
            zipcode=user[10],
            lon=user[11],
            lat=user[12],
            zone=user[13],
            first_frost=str(user[14]),
            last_frost=str(user[15]),
            high_temp=user[16],
            low_temp=user[17],
        )

    def create(self, info: UserIn) -> UserOutPass:
        with pool.connection() as conn:
            with conn.cursor() as db:
                print(db)
                result = db.execute(
                    """
                    INSERT INTO users (
                        type,
                        username,
                        email,
                        password_hash,
                        zipcode,
                        lon,
                        lat,
                        zone,
                        first_frost,
                        last_frost
                    )
                    VALUES
                        (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING *;
                    """,
                    [
                        info.type,
                        info.username,
                        info.email,
                        info.password_hash,
                        info.zipcode,
                        info.lon,
                        info.lat,
                        info.zone,
                        info.first_frost,
                        info.last_frost,
                    ],
                )
                print(result)
                user = result.fetchone()
                return self.user_pass_out(user)
        # except Exception as e:
        #     print(e)
        #     return {"error": "could not create that user"}

    def get(self, username: str) -> UserOutPass:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM users
                        WHERE username = %s
                        """,
                        [username],
                    )
                    user = result.fetchone()
                    return self.user_pass_out(user)
        except Exception as e:
            print(e)
            return {"error": "could not get that user"}