from pydantic import BaseModel
from queries.pool import pool


class SeedStorageIn(BaseModel):
    name: str
    color: str
    notes: str


class SeedStorageOut(SeedStorageIn):
    user_id: int
    id: int


class SeedStorageQueries:
    def seed_storage_out(self, storage):
        return SeedStorageOut(
            id=storage[0],
            user_id=storage[1],
            name=storage[2],
            color=storage[3],
            notes=storage[4],
        )

    def create(self, info: SeedStorageIn, user_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT into seed_storages (
                            user_id,
                            name,
                            color,
                            notes
                        )
                        VALUES
                            (%s, %s, %s, %s)
                        RETURNING *;
                        """,
                        [user_id, info.name, info.color, info.notes],
                    )
                    storage = result.fetchone()
                    return self.seed_storage_out(storage)
        except Exception as e:
            print(e)
            return {"error": "could not create that seed storage"}

    def delete(self, id: int, user_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM seed_storages
                        WHERE id = %s AND user_id = %s
                        """,
                        [id, user_id],
                    )
                    return True
        except Exception:
            return {"error": "failed to delete seed storage"}
