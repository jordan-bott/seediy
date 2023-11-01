from pydantic import BaseModel
from queries.pool import pool
from datetime import date


class PlantsIn(BaseModel):
    seed_id: int
    date_planted: date
    location: str
    notes: str


class PlantsOut(PlantsIn):
    id: int
    user_id: int
    currently_planted: bool
    harvest_date: date


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

    def create(self, info: PlantsIn, user_id: int, harvest: date):
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
                            harvest,
                            info.notes,
                        ],
                    )
                    plant = result.fetchone()
                    return self.plant_out(plant)
        except Exception as e:
            print(e)
            return {"error": "could not create that plant type"}

    def update(self, info: PlantsIn, id: int, user_id: int, harvest: date):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    print(db)
                    result = db.execute(
                        """
                        UPDATE plants
                        SET seed_id = %s,
                            date_planted = %s,
                            location = %s,
                            harvest_date = %s,
                            notes = %s
                        WHERE id = %s and user_id = %s
                        RETURNING *;
                        """,
                        [
                            info.seed_id,
                            info.date_planted,
                            info.location,
                            harvest,
                            info.notes,
                            id,
                            user_id,
                        ],
                    )
                    plant = result.fetchone()
                    return self.plant_out(plant)
        except Exception as e:
            print(e)
            return {"error": "could not create that plant type"}

    def by_user(self, user_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM plants
                        WHERE user_id = %s
                        """,
                        [user_id],
                    )
                    plants = result.fetchall()
                    plant_list = []
                    for plant in plants:
                        plant_list.append(self.plant_out(plant))
                    return plant_list
        except Exception as e:
            print(e)
            return {"error": "could not get that user's plants"}

    def planted_by_user(self, user_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM plants
                        WHERE user_id = %s and currently_planted = %s
                        """,
                        [user_id, True],
                    )
                    plants = result.fetchall()
                    plant_list = []
                    for plant in plants:
                        plant_list.append(self.plant_out(plant))
                    return plant_list
        except Exception as e:
            print(e)
            return {"error": "could not get that user's plants"}

    def delete(self, id: int, user_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM plants
                        WHERE id = %s AND user_id = %s
                        """,
                        [id, user_id],
                    )
                    return True
        except Exception:
            return {"error": "failed to delete plant"}

    def unplant(self, id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        UPDATE plants
                        SET currently_planted = %s
                        WHERE id = %s
                        RETURNING *;
                        """,
                        [False, id],
                    )
                    plant = result.fetchone()
                    return self.plant_out(plant)
        except Exception:
            return {"error": "failed to update plant to unplanted"}
