from pydantic import BaseModel
from queries.pool import pool
from datetime import date


class InstaseedIn(BaseModel):
    location: str
    season: str


class InstaseedOut(InstaseedIn):
    id: int
    user_id: int
    date_created: date
    likes: int


class InstaseedQueries:
    def instaseed_out(self, insta):
        return InstaseedOut(
            id=insta[0],
            user_id=insta[1],
            date_created=insta[2],
            location=insta[3],
            season=insta[4],
            likes=insta[5],
        )

    def create(self, info: InstaseedIn, user_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO instaseeds (
                            user_id,
                            location,
                            season
                        )
                        VALUES
                            (%s, %s, %s)
                        RETURNING *;
                        """,
                        [user_id, info.location, info.season],
                    )
                    insta = result.fetchone()
                    return self.instaseed_out(insta)
        except Exception as e:
            print(e)
            return {"error": "could not create that instaseed post"}

    def get_by_user(self, user_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM instaseeds
                        WHERE user_id = %s
                        """,
                        [user_id],
                    )
                    insta_list = []
                    instas = result.fetchall()
                    for insta in instas:
                        insta_list.append(self.instaseed_out(insta))
                    return insta_list
        except Exception as e:
            print(e)
            return {"error": "could not create that user's instaseed posts"}
