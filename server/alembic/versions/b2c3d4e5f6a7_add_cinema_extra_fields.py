"""add cinema extra fields

Revision ID: b2c3d4e5f6a7
Revises: a1b2c3d4e5f6
Create Date: 2026-02-23 00:00:00.000000
"""
from alembic import op
import sqlalchemy as sa

revision = "b2c3d4e5f6a7"
down_revision = "a1b2c3d4e5f6"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column("cinema", sa.Column("city", sa.String(100), nullable=True))
    op.add_column("cinema", sa.Column("description", sa.Text(), nullable=True))
    op.add_column("cinema", sa.Column("image_urls", sa.JSON(), nullable=True))
    op.add_column("cinema", sa.Column("advantages", sa.JSON(), nullable=True))


def downgrade() -> None:
    op.drop_column("cinema", "advantages")
    op.drop_column("cinema", "image_urls")
    op.drop_column("cinema", "description")
    op.drop_column("cinema", "city")
