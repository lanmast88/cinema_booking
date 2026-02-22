"""initial_schema

Revision ID: 247eb2a61eeb
Revises: 
Create Date: 2026-02-22 12:04:36.449745

"""
from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision: str = "247eb2a61eeb"
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "user",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("email", sa.String(length=255), nullable=False),
        sa.Column("password_hash", sa.String(length=255), nullable=False),
        sa.Column("role", sa.String(length=50), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=True),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_user_email"), "user", ["email"], unique=True)
    op.create_index(op.f("ix_user_id"), "user", ["id"], unique=False)

    op.create_table(
        "cinema",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(length=255), nullable=False),
        sa.Column("address", sa.Text(), nullable=True),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_cinema_id"), "cinema", ["id"], unique=False)

    op.create_table(
        "movie",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(length=255), nullable=False),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("duration_min", sa.Integer(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_movie_id"), "movie", ["id"], unique=False)

    op.create_table(
        "hall",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("cinema_id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(length=255), nullable=False),
        sa.Column("rows", sa.Integer(), nullable=False),
        sa.Column("seats_per_row", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(["cinema_id"], ["cinema.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_hall_id"), "hall", ["id"], unique=False)

    op.create_table(
        "screening",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("movie_id", sa.Integer(), nullable=False),
        sa.Column("hall_id", sa.Integer(), nullable=False),
        sa.Column("start_time", sa.DateTime(), nullable=False),
        sa.Column("price", sa.Numeric(precision=10, scale=2), nullable=False),
        sa.ForeignKeyConstraint(["hall_id"], ["hall.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["movie_id"], ["movie.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_screening_id"), "screening", ["id"], unique=False)

    op.create_table(
        "order",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("status", sa.String(length=20), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(["user_id"], ["user.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_order_id"), "order", ["id"], unique=False)

    op.create_table(
        "ticket",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("order_id", sa.Integer(), nullable=False),
        sa.Column("screening_id", sa.Integer(), nullable=False),
        sa.Column("row_number", sa.Integer(), nullable=False),
        sa.Column("seat_number", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(["order_id"], ["order.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["screening_id"], ["screening.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint(
            "screening_id",
            "row_number",
            "seat_number",
            name="uq_screening_row_seat",
        ),
    )
    op.create_index(op.f("ix_ticket_id"), "ticket", ["id"], unique=False)


def downgrade() -> None:
    op.drop_index(op.f("ix_ticket_id"), table_name="ticket")
    op.drop_table("ticket")

    op.drop_index(op.f("ix_order_id"), table_name="order")
    op.drop_table("order")

    op.drop_index(op.f("ix_screening_id"), table_name="screening")
    op.drop_table("screening")

    op.drop_index(op.f("ix_hall_id"), table_name="hall")
    op.drop_table("hall")

    op.drop_index(op.f("ix_movie_id"), table_name="movie")
    op.drop_table("movie")

    op.drop_index(op.f("ix_cinema_id"), table_name="cinema")
    op.drop_table("cinema")

    op.drop_index(op.f("ix_user_email"), table_name="user")
    op.drop_index(op.f("ix_user_id"), table_name="user")
    op.drop_table("user")
