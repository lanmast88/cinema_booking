from typing import Optional

from .base import OrmBase


class HallBase(OrmBase):
    name: str
    cinema_id: int
    rows: int = 4
    seats_per_row: int = 10


class HallCreate(HallBase):
    pass


class HallUpdate(OrmBase):
    name: Optional[str] = None
    rows: Optional[int] = None
    seats_per_row: Optional[int] = None


class HallOut(HallBase):
    id: int


__all__ = ["HallBase", "HallCreate", "HallUpdate", "HallOut"]

