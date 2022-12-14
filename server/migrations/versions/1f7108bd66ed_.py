"""empty message

Revision ID: 1f7108bd66ed
Revises: dda265b3c9e8
Create Date: 2022-10-25 04:16:22.157244

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1f7108bd66ed'
down_revision = 'dda265b3c9e8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('flood_history',
    sa.Column('Datetime', sa.DateTime(), nullable=False),
    sa.Column('CCTVID', sa.String(length=7), nullable=False),
    sa.Column('FloodStage', sa.Integer(), nullable=False),
    sa.Column('ImageURL', sa.Text(), nullable=True),
    sa.Column('Temperature', sa.Float(), nullable=True),
    sa.Column('Humidity', sa.Float(), nullable=True),
    sa.Column('Precipitation', sa.Float(), nullable=True),
    sa.ForeignKeyConstraint(['CCTVID'], ['cctv.ID'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('Datetime', 'CCTVID', name='HistoryCode')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('flood_history')
    # ### end Alembic commands ###
