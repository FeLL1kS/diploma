import * as Sequelize from 'sequelize';
import SequelizeInstance from '../config/SequelizeInstance';

export interface GroupAttributes {
  id: string;
  course: string;
  group: string;
  departmentId: string;
}

export interface GroupCreationAttributes
  extends Sequelize.Optional<GroupAttributes, 'id'> {}

export interface GroupInstance
  extends Sequelize.Model<GroupAttributes, GroupCreationAttributes>,
    GroupAttributes {}

export const GroupModel = SequelizeInstance.getSequelizeInstance().define<GroupInstance>('groups', {
  id: {
    allowNull: false,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
  },
  course: {
    allowNull: false,
    type: Sequelize.STRING(1),
  },
  group: {
    allowNull: false,
    type: Sequelize.STRING(5),
  },
  departmentId: {
    allowNull: false,
    type: Sequelize.UUID,
    references: {
      model: 'department',
      key: 'id',
    },
  },
});
