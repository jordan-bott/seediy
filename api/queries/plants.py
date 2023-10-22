from pydantic import BaseModel
from queries.pool import pool
from datetime import date


class PlantsIn(BaseModel):
    seed_id: int
    date_planted: date
    location: str
    harvest_date: date
    notes: str


class PlantsOut(PlantsIn):
    id: int
    user_id: int
    currently_planted: bool


class PlantQueries:
    def plant_out(self, plant):
        return PlantsOut(
            id=plant[0],
            user_id=plant[1],
            seed_id=plant[2],
            date_planted=plant[3],
            location=plant[4],
            currently_planted=plant[5],
            harvest_date=plant[6],
            notes=plant[7],
        )

    def create(self, info: PlantsIn, user_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    print(db)
                    result = db.execute(
                        """
                        INSERT INTO plants (
                            user_id,
                            seed_id,
                            date_planted,
                            location,
                            harvest_date,
                            notes
                        )
                        VALUES
                            (%s, %s, %s, %s, %s, %s)
                        RETURNING *;
                        """,
                        [
                            user_id,
                            info.seed_id,
                            info.date_planted,
                            info.location,
                            info.harvest_date,
                            info.notes,
                        ],
                    )
                    plant = result.fetchone()
                    return self.plant_out(plant)
        except Exception as e:
            print(e)
            return {"error": "could not create that plant type"}
