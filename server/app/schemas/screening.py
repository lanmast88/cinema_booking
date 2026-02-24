from datetime import datetime
from decimal import Decimal
from typing import Optional

from .base import OrmBase


class ScreeningBase(OrmBase):
    movie_id: int
    hall_id: int
    start_time: datetime
    price: Decimal
    format: Optional[str] = None


class ScreeningCreate(ScreeningBase):
    pass


class ScreeningUpdate(OrmBase):
    start_time: Optional[datetime] = None
    price: Optional[Decimal] = None
    format: Optional[str] = None


class ScreeningOut(ScreeningBase):
    id: int


__all__ = ["ScreeningBase", "ScreeningCreate", "ScreeningUpdate", "ScreeningOut"]

