import * as Sequelize from 'sequelize';
import SequelizeInstance from '../config/SequelizeInstance';

export interface DepartmentAttributes {
  id: string;
  departmentName: string;
}

export interface DepartmentCreationAttributes
  extends Sequelize.Optional<DepartmentAttributes, 'id'> {}

export interface DepartmentInstance
  extends Sequelize.Model<DepartmentAttributes, DepartmentCreationAttributes>,
    DepartmentAttributes {}

export const DepartmentModel = SequelizeInstance.getSequelizeInstance().define<DepartmentInstance>('departments', {
  id: {
    allowNull: false,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
  },
  departmentName: {
    allowNull: false,
    type: Sequelize.STRING(255),
  },
});
