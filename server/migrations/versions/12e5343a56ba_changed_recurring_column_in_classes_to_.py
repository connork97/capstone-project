"""changed recurring column in classes to frequency

Revision ID: 12e5343a56ba
Revises: 22fe990450d0
Create Date: 2023-05-23 12:36:07.665271

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '12e5343a56ba'
down_revision = '22fe990450d0'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('classes', schema=None) as batch_op:
        batch_op.add_column(sa.Column('frequency', sa.String(), nullable=True))
        batch_op.drop_column('recurring')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('classes', schema=None) as batch_op:
        batch_op.add_column(sa.Column('recurring', sa.BOOLEAN(), nullable=True))
        batch_op.drop_column('frequency')

    # ### end Alembic commands ###
