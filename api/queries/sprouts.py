from pydantic import BaseModel
from queries.pool import pool


class SproutIn(BaseModel):
    author_id: int
    blog_id: int


class SproutOut(SproutIn):
    id: int
    user_id: int


class SproutQueries:
    def sprout_out(self, sprout):
        return SproutOut(
            id=sprout[0],
            user_id=sprout[1],
            author_id=sprout[2],
            blog_id=sprout[3],
        )

    def create(self, info: SproutIn, user_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO sprouts (
                            user_id,
                            author_id,
                            blog_id
                        )
                        VALUES
                            (%s, %s, %s)
                        RETURNING *;
                        """,
                        [user_id, info.author_id, info.blog_id],
                    )
                    sprout = result.fetchone()
                    return self.sprout_out(sprout)
        except Exception as e:
            print(e)
            return {"error": "could not create that sprout"}

    def get_by_blog(self, blog_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM sprouts
                        WHERE blog_id = %s
                        """,
                        [blog_id],
                    )
                    sprouts = result.fetchall()
                    sprout_list = []
                    for sprout in sprouts:
                        sprout_list.append(self.sprout_out(sprout))
                    return sprout_list
        except Exception as e:
            print(e)
            return {"error": "could not get those sprouts"}

    def delete(self, id: int, user_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM sprouts
                        WHERE id = %s AND user_id = %s
                        """,
                        [id, user_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return {"error": "could not delete that sprout"}

    def user_sprouts(self, user_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT blog_id
                        FROM sprouts
                        WHERE user_id = %s
                        """,
                        [user_id],
                    )
                    sprouts = result.fetchall()
                    sprout_list = []
                    for sprout in sprouts:
                        sprout_list.append(sprout[0])
                    return sprout_list
        except Exception as e:
            print(e)
            return {"error": "could not create that sprout"}
