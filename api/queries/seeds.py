from pydantic import BaseModel
from queries.pool import pool


class SeedIn(BaseModel):
    name: str
    nickname: str
    quantity: int
    days_to_harvest: int
    frost_hardy: bool
    season: str
    water_needs: int
    rating: int
    brand: str
    url: str
    category: str
    plant_type_id: int | None
    seed_storage_id: int | None
    notes: str


class SeedOut(SeedIn):
    id: int
    user_id: int
    planted: bool
    on_list: bool


class SeedJoinOut(SeedOut):
    location_name: str
    location_color: str
    category_name: str


class SeedQueries:
    def seed_out(self, seed):
        return SeedOut(
            id=seed[0],
            user_id=seed[1],
            name=seed[2],
            nickname=seed[3],
            quantity=seed[4],
            days_to_harvest=seed[5],
            frost_hardy=seed[6],
            planted=seed[7],
            season=seed[8],
            water_needs=seed[9],
            rating=seed[10],
            brand=seed[11],
            url=seed[12],
            category=seed[13],
            plant_type_id=seed[14],
            seed_storage_id=seed[15],
            on_list=seed[16],
            notes=seed[17],
        )

    def seed_join_out(self, seed):
        return SeedJoinOut(
            id=seed[0],
            user_id=seed[1],
            name=seed[2],
            nickname=seed[3],
            quantity=seed[4],
            days_to_harvest=seed[5],
            frost_hardy=seed[6],
            planted=seed[7],
            season=seed[8],
            water_needs=seed[9],
            rating=seed[10],
            brand=seed[11],
            url=seed[12],
            category=seed[13],
            plant_type_id=seed[14],
            seed_storage_id=seed[15],
            on_list=seed[16],
            notes=seed[17],
            location_name=seed[18],
            location_color=seed[19],
            category_name=seed[20],
        )

    def create(self, info: SeedIn, user_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO seeds (
                            user_id,
                            name,
                            nickname,
                            quantity,
                            days_to_harvest,
                            frost_hardy,
                            season,
                            water_needs,
                            rating,
                            brand,
                            url,
                            category,
                            plant_type_id,
                            seed_storage_id,
                            notes
                        )
                        VALUES
                            (
                                %s, %s, %s, %s, %s, %s, %s, %s,
                                %s, %s, %s, %s, %s, %s, %s
                            )
                        RETURNING *;
                        """,
                        [
                            user_id,
                            info.name,
                            info.nickname,
                            info.quantity,
                            info.days_to_harvest,
                            info.frost_hardy,
                            info.season,
                            info.water_needs,
                            info.rating,
                            info.brand,
                            info.url,
                            info.category,
                            info.plant_type_id,
                            info.seed_storage_id,
                            info.notes,
                        ],
                    )
                    seed = result.fetchone()
                    return self.seed_out(seed)
        except Exception as e:
            print(e)
            return {"error": "could not create that seed"}

    def get_by_user(self, user_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT seeds.*,
                        seed_storages.name,
                        seed_storages.color,
                        plant_types.name
                        FROM seeds
                        LEFT OUTER JOIN seed_storages
                        ON seeds.seed_storage_id = seed_storages.id
                        LEFT OUTER JOIN plant_types
                        ON seeds.plant_type_id = plant_types.id
                        WHERE seeds.user_id = %s
                        ORDER BY seeds.id
                        """,
                        [user_id],
                    )
                    seeds = result.fetchall()
                    seed_list = []
                    for seed in seeds:
                        seed_list.append(self.seed_join_out(seed))
                    return seed_list
        except Exception as e:
            print(e)
            return {"error": "could not get seed list for user"}

    def update(self, info: SeedIn, id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        UPDATE seeds
                        SET name = %s,
                            nickname = %s,
                            quantity = %s,
                            days_to_harvest = %s,
                            frost_hardy = %s,
                            season = %s,
                            water_needs = %s,
                            rating = %s,
                            brand = %s,
                            url = %s,
                            category = %s,
                            plant_type_id = %s,
                            seed_storage_id = %s,
                            notes = %s
                        WHERE id = %s
                        RETURNING *;
                        """,
                        [
                            info.name,
                            info.nickname,
                            info.quantity,
                            info.days_to_harvest,
                            info.frost_hardy,
                            info.season,
                            info.water_needs,
                            info.rating,
                            info.brand,
                            info.url,
                            info.category,
                            info.plant_type_id,
                            info.seed_storage_id,
                            info.notes,
                            id,
                        ],
                    )
                    seed = result.fetchone()
                    return self.seed_out(seed)
        except Exception as e:
            print(e)
            return {"error": "could not update that seed"}

    def get_one(self, id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM seeds
                        WHERE id = %s
                        """,
                        [id],
                    )
                    seed = result.fetchone()
                    return self.seed_out(seed)
        except Exception as e:
            print(e)
            return {"error": "could not get seed"}

    def delete(self, id: int, user_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM seeds
                        WHERE id = %s AND user_id = %s
                        """,
                        [id, user_id],
                    )
                    return True
        except Exception:
            return {"error": "failed to delete seed"}

    def planted(self, id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        UPDATE seeds
                        SET planted = %s
                        WHERE id = %s
                        RETURNING *;
                        """,
                        [True, id],
                    )
                    seed = result.fetchone()
                    return self.seed_out(seed)
        except Exception:
            return {"error": "failed to update seed to planted"}

    def not_planted(self, id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        UPDATE seeds
                        SET planted = %s
                        WHERE id = %s
                        RETURNING *;
                        """,
                        [False, id],
                    )
                    seed = result.fetchone()
                    return self.seed_out(seed)
        except Exception:
            return {"error": "failed to update seed to planted"}

    def add_to_list(self, id: int, user_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        UPDATE seeds
                        SET on_list = %s
                        WHERE id = %s AND user_id = %s
                        RETURNING *;
                        """,
                        [True, id, user_id],
                    )
                    seed = result.fetchone()
                    return self.seed_out(seed)
        except Exception:
            return {"error": "failed to update seed to planted"}

    def remove_from_list(self, id: int, user_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        UPDATE seeds
                        SET on_list = %s
                        WHERE id = %s AND user_id = %s
                        RETURNING *;
                        """,
                        [False, id, user_id],
                    )
                    seed = result.fetchone()
                    return self.seed_out(seed)
        except Exception:
            return {"error": "failed to update seed to planted"}

    def shopping_list(self, user_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM seeds
                        WHERE user_id = %s AND on_list = %s
                        """,
                        [user_id, True],
                    )
                    seeds = result.fetchall()
                    seed_list = []
                    for seed in seeds:
                        seed_list.append(self.seed_out(seed))
                    return seed_list
        except Exception:
            return {"error": "failed to get shopping list"}
