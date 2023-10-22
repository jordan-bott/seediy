from pydantic import BaseModel
from queries.pool import pool
from datetime import date


class WaterIn(BaseModel):
    plant_id: int
    date: date


class WaterOut(WaterIn):
    id: int
    user_id: int


class WaterQueries:
    def water_out(self, water):
        return WaterOut(
            id=water[0], user_id=water[1], plant_id=water[2], date=water[3]
        )

    def create(self, info: WaterIn, user_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO water_logs (
                            user_id,
                            plant_id,
                            date
                        )
                        VALUES
                            (%s, %s, %s)
                        RETURNING *;
                        """,
                        [user_id, info.plant_id, info.date],
                    )
                    water = result.fetchone()
                    return self.water_out(water)
        except Exception as e:
            print(e)
            return {"error": "could not create that water log"}

    def delete(self, id: int, user_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM water_logs
                        WHERE id = %s AND user_id = %s
                        """,
                        [id, user_id],
                    )
                    return True
        except Exception:
            return {"error": "failed to delete water log"}
