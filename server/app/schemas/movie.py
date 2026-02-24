from typing import Optional

from .base import OrmBase


class MovieBase(OrmBase):
    name: str
    description: Optional[str] = None
    duration_min: int
    poster_url: Optional[str] = None


class MovieCreate(MovieBase):
    pass


class MovieUpdate(OrmBase):
    name: Optional[str] = None
    description: Optional[str] = None
    duration_min: Optional[int] = None
    poster_url: Optional[str] = None


class MovieOut(MovieBase):
    id: int


__all__ = ["MovieBase", "MovieCreate", "MovieUpdate", "MovieOut"]

