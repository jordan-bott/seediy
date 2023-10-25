from pydantic import BaseModel
from queries.pool import pool
from datetime import date
from typing import Optional


class CommentIn(BaseModel):
    blog_id: int
    parent_comment: Optional[int]
    text: str


class CommentOut(CommentIn):
    id: int
    user_id: int
    date_created: date


class CommentUpdateIn(BaseModel):
    user_id: int
    text: str


class CommentQueries:
    def comment_out(self, comment):
        return CommentOut(
            id=comment[0],
            user_id=comment[1],
            date_created=comment[2],
            blog_id=comment[3],
            parent_comment=comment[4],
            text=comment[5],
        )

    def create(self, info: CommentIn, user_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO blog_comments (
                            user_id,
                            blog_id,
                            parent_comment,
                            text
                        )
                        VALUES
                            (%s, %s, %s, %s)
                        RETURNING *;
                        """,
                        [
                            user_id,
                            info.blog_id,
                            info.parent_comment,
                            info.text,
                        ],
                    )
                    comment = result.fetchone()
                    return self.comment_out(comment)
        except Exception as e:
            print(e)
            return {"error": "could not create that comment"}

    def get_by_blog(self, blog_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM blog_comments
                        WHERE blog_id = %s
                        """,
                        [blog_id],
                    )
                    comments = result.fetchall()
                    comment_list = []
                    for comment in comments:
                        comment_list.append(self.comment_out(comment))
                    return comment_list
        except Exception as e:
            print(e)
            return {"error": "could not get comments for that blog"}

    def delete(self, id: int, user_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM blog_comments
                        WHERE user_id = %s and id = %s
                        """,
                        [user_id, id],
                    )
                    return True
        except Exception as e:
            print(e)
            return {"error": "could not delete that comment"}

    def admin_delete(self, id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM blog_comments
                        WHERE id = %s
                        """,
                        [id],
                    )
                    return True
        except Exception as e:
            print(e)
            return {"error": "could not delete that comment"}

    def update(self, info: CommentUpdateIn, id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        UPDATE blog_comments
                        SET text = %s
                        WHERE id = %s and user_id = %s
                        RETURNING *
                        """,
                        [info.text, id, info.user_id],
                    )
                    comment = result.fetchone()
                    return self.comment_out(comment)
        except Exception as e:
            print(e)
            return {"error": "could not update that comment"}
