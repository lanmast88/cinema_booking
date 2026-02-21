from datetime import datetime

from pydantic import EmailStr

from .base import OrmBase


class UserCreate(OrmBase):
    """Данные для регистрации нового пользователя."""

    email: EmailStr
    password: str


class UserLogin(OrmBase):
    """Данные для входа (используется как OAuth2 form)."""

    email: EmailStr
    password: str


class UserOut(OrmBase):
    """Публичное представление пользователя."""

    id: int
    email: EmailStr
    role: str
    created_at: datetime


__all__ = ["UserCreate", "UserLogin", "UserOut"]
