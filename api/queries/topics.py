from pydantic import BaseModel
from queries.pool import pool


class TopicIn(BaseModel):
    name: str
    color: str


class TopicOut(TopicIn):
    id: int


class TopicQueries:
    def topic_out(self, topic):
        return TopicOut(id=topic[0], name=topic[1], color=topic[2])

    def create(self, info: TopicIn):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO topics (
                            name,
                            color
                        )
                        VALUES
                            (%s, %s)
                        RETURNING *;
                        """,
                        [info.name, info.color],
                    )
                    topic = result.fetchone()
                    return self.topic_out(topic)
        except Exception as e:
            print(e)
            return {"error": "could not create that topic"}

    def get_all(self):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM topics
                        """
                    )
                    topics = result.fetchall()
                    topic_list = []
                    for topic in topics:
                        topic_list.append(self.topic_out(topic))
                    return topic_list
        except Exception as e:
            print(e)
            return {"error": "could not get topics"}

    def delete(self, id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM topics
                        WHERE id = %s
                        """,
                        [id],
                    )
                    return True
        except Exception:
            return {"error": "failed to delete topic"}
