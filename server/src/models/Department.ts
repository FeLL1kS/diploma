import * as Sequelize from 'sequelize';
import SequelizeInstance from '../config/SequelizeInstance';

const Department = SequelizeInstance.getSequelizeInstance().define('department', {
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

export default Department;
