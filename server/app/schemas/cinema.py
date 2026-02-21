from typing import Optional

from .base import OrmBase


class CinemaBase(OrmBase):
    name: str
    address: Optional[str] = None


class CinemaCreate(CinemaBase):
    pass


class CinemaUpdate(OrmBase):
    name: Optional[str] = None
    address: Optional[str] = None


class CinemaOut(CinemaBase):
    id: int


__all__ = ["CinemaBase", "CinemaCreate", "CinemaUpdate", "CinemaOut"]

