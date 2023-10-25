from pydantic import BaseModel
from queries.pool import pool
from datetime import date


class BlogIn(BaseModel):
    topic: int
    text: str


class BlogOut(BlogIn):
    id: int
    user_id: int
    date_created: date


class BlogQueries:
    def blog_out(self, blog):
        return BlogOut(
            id=blog[0],
            user_id=blog[1],
            date_created=blog[2],
            topic=blog[3],
            text=blog[4],
        )

    def create(self, info: BlogIn, user_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO blogs (
                            user_id,
                            topic,
                            text
                        )
                        VALUES
                            (%s, %s, %s)
                        RETURNING *;
                        """,
                        [user_id, info.topic, info.text],
                    )
                    blog = result.fetchone()
                    return self.blog_out(blog)
        except Exception as e:
            print(e)
            return {"error": "could not create that water log"}

    def get_all(self):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM blogs
                        """
                    )
                    blogs = result.fetchall()
                    blog_list = []
                    for blog in blogs:
                        blog_list.append(self.blog_out(blog))
                    return blog_list
        except Exception as e:
            print(e)
            return {"error": "could not create that water log"}

    def get_by_user(self, user_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM blogs
                        WHERE user_id = %s
                        """,
                        [user_id],
                    )
                    blogs = result.fetchall()
                    blog_list = []
                    for blog in blogs:
                        blog_list.append(self.blog_out(blog))
                    return blog_list
        except Exception as e:
            print(e)
            return {"error": "could not create that water log"}

    def delete(self, id: int, user_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM blogs
                        WHERE id = %s AND user_id = %s
                        """,
                        [id, user_id],
                    )
                    return True
        except Exception:
            return {"error": "failed to delete water log"}
