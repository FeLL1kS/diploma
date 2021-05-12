import * as Sequelize from 'sequelize';
import SequelizeInstance from '../config/SequelizeInstance';

const Role = SequelizeInstance.getSequelizeInstance().define('role', {
  id: {
    allowNull: false,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
  },
  name: {
    allowNull: false,
    type: Sequelize.STRING(255),
  },
});

export default Role;
