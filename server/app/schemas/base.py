from pydantic import BaseModel, ConfigDict


class OrmBase(BaseModel):
    """Базовая схема с поддержкой ORM."""

    model_config = ConfigDict(from_attributes=True)


__all__ = ["OrmBase"]

