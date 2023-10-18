from pydantic import BaseModel
from queries.pool import pool


class PlantTypeIn(BaseModel):
    name: str


class PlantTypeOut(BaseModel):
    id: int
    user_id: int
    name: str


class PlantTypeQueries:
    def plant_type_out(self, plant):
        return PlantTypeOut(id=plant[0], user_id=plant[1], name=plant[2])

    def create(self, info: PlantTypeIn, user_id: int) -> PlantTypeOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    print(db)
                    result = db.execute(
                        """
                        INSERT INTO plant_types (
                            user_id,
                            name
                        )
                        VALUES
                            (%s, %s)
                        RETURNING *;
                        """,
                        [user_id, info.name],
                    )
                    plant_type = result.fetchone()
                    return self.plant_type_out(plant_type)
        except Exception as e:
            print(e)
            return {"error": "could not create that plant type"}

    def delete(self, id: int, user_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM plant_types
                        WHERE id = %s AND user_id = %s
                        """,
                        [id, user_id],
                    )
                    return True
        except Exception:
            return {"error": "failed to delete plant type"}
