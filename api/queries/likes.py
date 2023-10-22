from pydantic import BaseModel
from queries.pool import pool


class LikesIn(BaseModel):
    author_id: int
    post_id: int


class LikesOut(LikesIn):
    id: int
    user_id: int


class LikesQueries:
    def likes_out(self, like):
        return LikesOut(
            id=like[0], user_id=like[1], author_id=like[2], post_id=like[3]
        )

    def create(self, info: LikesIn, user_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO likes (
                            user_id,
                            author_id,
                            post_id
                        )
                        VALUES
                            (%s, %s, %s)
                        RETURNING *;
                        """,
                        [user_id, info.author_id, info.post_id],
                    )
                    like = result.fetchone()
                    return self.likes_out(like)
        except Exception as e:
            print(e)
            return {"error": "could not create that like"}

    def unlike(self, post_id: int, user_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM likes
                        WHERE post_id = %s AND user_id = %s
                        """,
                        [post_id, user_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return {"error": "could not remove that like"}

    def get_by_post(self, post_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM likes
                        WHERE post_id = %s
                        """,
                        [post_id],
                    )
                    like_list = []
                    likes = result.fetchall()
                    for like in likes:
                        like_list.append(self.likes_out(like))
                    return like_list
        except Exception as e:
            print(e)
            return {"error": "could not remove that like"}
