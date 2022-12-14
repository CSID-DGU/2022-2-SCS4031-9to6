"""empty message

Revision ID: 3ecb7393567c
Revises: de784fee7bdd
Create Date: 2022-11-14 14:30:16.133462

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3ecb7393567c'
down_revision = 'de784fee7bdd'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_foreign_key(None, 'bookmark', 'cctv', ['cctvID'], ['ID'], ondelete='CASCADE')
    op.create_foreign_key(None, 'bookmark', 'member', ['memberID'], ['ID'], ondelete='CASCADE')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'bookmark', type_='foreignkey')
    op.drop_constraint(None, 'bookmark', type_='foreignkey')
    # ### end Alembic commands ###
