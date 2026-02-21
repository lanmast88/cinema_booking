from typing import Optional

from .base import OrmBase


class HallBase(OrmBase):
    name: str
    cinema_id: int


class HallCreate(HallBase):
    pass


class HallUpdate(OrmBase):
    name: Optional[str] = None


class HallOut(HallBase):
    id: int


__all__ = ["HallBase", "HallCreate", "HallUpdate", "HallOut"]

