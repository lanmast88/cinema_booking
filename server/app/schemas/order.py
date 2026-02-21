from datetime import datetime

from pydantic import Field

from .base import OrmBase


class SeatIn(OrmBase):
    """Место в зале, которое хочет занять пользователь."""

    row_number: int
    seat_number: int


class OrderCreate(OrmBase):
    """Тело запроса на создание заказа."""

    screening_id: int
    seats: list[SeatIn] = Field(min_length=1)


class TicketOut(OrmBase):
    """Билет внутри заказа."""

    id: int
    order_id: int
    screening_id: int
    row_number: int
    seat_number: int


class OrderOut(OrmBase):
    """Заказ с вложенными билетами."""

    id: int
    user_id: int
    status: str
    created_at: datetime
    tickets: list[TicketOut] = []


__all__ = ["SeatIn", "OrderCreate", "TicketOut", "OrderOut"]
