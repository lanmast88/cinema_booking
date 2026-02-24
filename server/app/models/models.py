"""ORM‑модели SQLAlchemy для сервиса бронирования кино."""
from datetime import datetime

from sqlalchemy import (
    Column,
    DateTime,
    ForeignKey,
    Integer,
    JSON,
    Numeric,
    String,
    Text,
    UniqueConstraint,
)
from sqlalchemy.orm import relationship

from app.db.database import Base


class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    role = Column(String(50), nullable=False, default="client")  # клиент / администратор
    created_at = Column(DateTime, default=datetime.utcnow)

    orders = relationship("Order", back_populates="user", cascade="all, delete-orphan")


class Cinema(Base):
    __tablename__ = "cinema"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    address = Column(Text, nullable=True)
    city = Column(String(100), nullable=True)
    description = Column(Text, nullable=True)
    image_urls = Column(JSON, nullable=True)   # list[str]
    advantages = Column(JSON, nullable=True)   # list[str]

    halls = relationship("Hall", back_populates="cinema", cascade="all, delete-orphan")


class Hall(Base):
    __tablename__ = "hall"

    id = Column(Integer, primary_key=True, index=True)
    cinema_id = Column(Integer, ForeignKey("cinema.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(255), nullable=False)
    rows = Column(Integer, nullable=False, default=4)
    seats_per_row = Column(Integer, nullable=False, default=10)

    cinema = relationship("Cinema", back_populates="halls")
    screenings = relationship(
        "Screening",
        back_populates="hall",
        cascade="all, delete-orphan",
    )


class Movie(Base):
    __tablename__ = "movie"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    duration_min = Column(Integer, nullable=False)  # минуты
    poster_url = Column(String(512), nullable=True)

    screenings = relationship(
        "Screening",
        back_populates="movie",
        cascade="all, delete-orphan",
    )


class Screening(Base):
    __tablename__ = "screening"

    id = Column(Integer, primary_key=True, index=True)
    movie_id = Column(Integer, ForeignKey("movie.id", ondelete="CASCADE"), nullable=False)
    hall_id = Column(Integer, ForeignKey("hall.id", ondelete="CASCADE"), nullable=False)
    start_time = Column(DateTime, nullable=False)
    price = Column(Numeric(10, 2), nullable=False)
    format = Column(String(50), nullable=True)  # 2D / IMAX / Dolby / 3D

    movie = relationship("Movie", back_populates="screenings")
    hall = relationship("Hall", back_populates="screenings")
    tickets = relationship(
        "Ticket",
        back_populates="screening",
        cascade="all, delete-orphan",
    )


class Order(Base):
    __tablename__ = "order"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"), nullable=False)
    status = Column(String(20), nullable=False, default="created")  # создан / оплачен / отменён
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="orders")
    tickets = relationship(
        "Ticket",
        back_populates="order",
        cascade="all, delete-orphan",
    )


class Ticket(Base):
    __tablename__ = "ticket"
    __table_args__ = (
        UniqueConstraint(
            "screening_id",
            "row_number",
            "seat_number",
            name="uq_screening_row_seat",
        ),
    )

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("order.id", ondelete="CASCADE"), nullable=False)
    screening_id = Column(Integer, ForeignKey("screening.id", ondelete="CASCADE"), nullable=False)
    row_number = Column(Integer, nullable=False)
    seat_number = Column(Integer, nullable=False)

    order = relationship("Order", back_populates="tickets")
    screening = relationship("Screening", back_populates="tickets")