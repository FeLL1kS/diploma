import * as Sequelize from 'sequelize';
import SequelizeInstance from '../config/SequelizeInstance';

export interface RoleAttributes {
  id: string;
  roleName: string;
}

export interface RoleCreationAttributes
  extends Sequelize.Optional<RoleAttributes, 'id'> {}

export interface RoleInstance
  extends Sequelize.Model<RoleAttributes, RoleCreationAttributes>,
    RoleAttributes {}

export const RoleModel = SequelizeInstance.getSequelizeInstance().define<RoleInstance>('roles', {
  id: {
    allowNull: false,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
  },
  roleName: {
    allowNull: false,
    type: Sequelize.STRING(255),
  },
});
