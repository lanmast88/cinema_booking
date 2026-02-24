from typing import List, Optional

from .base import OrmBase


class CinemaBase(OrmBase):
    name: str
    address: Optional[str] = None
    city: Optional[str] = None
    description: Optional[str] = None
    image_urls: Optional[List[str]] = None
    advantages: Optional[List[str]] = None


class CinemaCreate(CinemaBase):
    pass


class CinemaUpdate(OrmBase):
    name: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    description: Optional[str] = None
    image_urls: Optional[List[str]] = None
    advantages: Optional[List[str]] = None


class CinemaOut(CinemaBase):
    id: int


__all__ = ["CinemaBase", "CinemaCreate", "CinemaUpdate", "CinemaOut"]

