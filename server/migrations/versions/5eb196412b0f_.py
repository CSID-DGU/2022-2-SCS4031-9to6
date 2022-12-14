"""empty message

Revision ID: 5eb196412b0f
Revises: 
Create Date: 2022-10-19 16:10:38.094971

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5eb196412b0f'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('member',
    sa.Column('id', sa.String(length=20), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=100), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('member')
    # ### end Alembic commands ###
