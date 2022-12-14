"""empty message

Revision ID: 61217175c420
Revises: 5eb196412b0f
Create Date: 2022-10-21 14:56:22.548480

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '61217175c420'
down_revision = '5eb196412b0f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('cctv',
    sa.Column('ID', sa.String(length=7), nullable=False),
    sa.Column('Name', sa.String(length=20), nullable=False),
    sa.Column('Center', sa.String(length=20), nullable=False),
    sa.Column('Longtitude', sa.Float(), nullable=False),
    sa.Column('Latitude', sa.Float(), nullable=False),
    sa.Column('URL', sa.Text(), nullable=True),
    sa.PrimaryKeyConstraint('ID'),
    sa.UniqueConstraint('Name')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('cctv')
    # ### end Alembic commands ###
