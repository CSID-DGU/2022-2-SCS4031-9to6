"""empty message

Revision ID: 7edd7d8222e4
Revises: 36dffbd17142
Create Date: 2022-11-24 15:37:01.819581

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7edd7d8222e4'
down_revision = '36dffbd17142'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('posting', sa.Column('Region', sa.String(length=30), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('posting', 'Region')
    # ### end Alembic commands ###
