"""add poster_url to movie and format to screening

Revision ID: a1b2c3d4e5f6
Revises: 247eb2a61eeb
Create Date: 2026-02-24 12:00:00.000000

"""
from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

revision: str = "a1b2c3d4e5f6"
down_revision: Union[str, Sequence[str], None] = "247eb2a61eeb"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column("movie", sa.Column("poster_url", sa.String(512), nullable=True))
    op.add_column("screening", sa.Column("format", sa.String(50), nullable=True))


def downgrade() -> None:
    op.drop_column("screening", "format")
    op.drop_column("movie", "poster_url")
