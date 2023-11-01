from pydantic import BaseModel
from queries.pool import pool
from datetime import date
from typing import List


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


class UserPasswordIn(BaseModel):
    id: int
    password_hash: str


class UserUpdateIn(BaseModel):
    id: int
    username: str
    email: str
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
    likes: int
    instaseeds: int
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

    def user_out(self, user):
        return UserOut(
            id=user[0],
            type=user[1],
            username=user[2],
            email=user[3],
            verified=user[4],
            posts=user[5],
            sprouts=user[6],
            likes=user[7],
            instaseeds=user[8],
            date_created=str(user[9]),
            units=user[11],
            zipcode=user[12],
            lon=user[13],
            lat=user[14],
            zone=user[15],
            first_frost=str(user[16]),
            last_frost=str(user[17]),
            high_temp=user[18],
            low_temp=user[19],
        )

    def create(self, info: UserIn) -> UserOutPass:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
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
                    user = result.fetchone()
                    return self.user_pass_out(user)
        except Exception as e:
            print(e)
            return {"error": "could not create that user"}

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

    def update(self, info: UserUpdateIn) -> UserOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        UPDATE users
                        SET username = %s,
                            email = %s,
                            zipcode = %s,
                            lon = %s,
                            lat = %s,
                            zone = %s,
                            first_frost = %s,
                            last_frost = %s
                        WHERE id = %s
                        RETURNING *;
                        """,
                        [
                            info.username,
                            info.email,
                            info.zipcode,
                            info.lon,
                            info.lat,
                            info.zone,
                            info.first_frost,
                            info.last_frost,
                            info.id,
                        ],
                    )
                    user = result.fetchone()
                    return self.user_out(user)
        except Exception:
            return {"error": "failed to update user"}

    def update_password(self, info: UserPasswordIn) -> UserOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        UPDATE users
                        SET password_hash = %s
                        WHERE id = %s
                        RETURNING *;
                        """,
                        [info.password_hash, info.id],
                    )
                    user = result.fetchone()
                    return self.user_out(user)
        except Exception:
            return {"error": "failed to update user"}

    def to_admin(self, user_id: int) -> UserOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        UPDATE users
                        SET type = %s
                        WHERE id = %s
                        RETURNING *;
                        """,
                        ["admin", user_id],
                    )
                    user = result.fetchone()
                    return self.user_out(user)
        except Exception:
            return {"error": "failed to update user"}

    def delete(self, user_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM users
                        WHERE id = %s
                        """,
                        [user_id],
                    )
                    return True
        except Exception:
            return {"error": "failed to delete user"}

    def get_all(self) -> List[UserOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM users
                        """
                    )
                    user = result.fetchall()
                    users = []
                    for u in user:
                        users.append(self.user_out(u))
                    return users
        except Exception as e:
            print(e)
            return {"error": "could not get list of users"}

    def add_blog(self, user_id: int) -> UserOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        UPDATE users
                        SET posts = posts + 1
                        WHERE id = %s
                        RETURNING *;
                        """,
                        [user_id],
                    )
                    user = result.fetchone()
                    return self.user_out(user)
        except Exception:
            return {"error": "failed to add post for that user"}

    def add_sprout(self, user_id: int) -> UserOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        UPDATE users
                        SET sprouts = sprouts + 1
                        WHERE id = %s
                        RETURNING *;
                        """,
                        [user_id],
                    )
                    user = result.fetchone()
                    return self.user_out(user)
        except Exception:
            return {"error": "failed to add sprout for that user"}
