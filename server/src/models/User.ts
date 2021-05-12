import * as Sequelize from 'sequelize';
import SequelizeInstance from '../config/SequelizeInstance';

const User = SequelizeInstance.getSequelizeInstance().define('user', {
  id: {
    allowNull: false,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
  },
  firstName: {
    allowNull: false,
    type: Sequelize.STRING(255),
  },
  lastName: {
    allowNull: false,
    type: Sequelize.STRING(255),
  },
  patronymic: {
    type: Sequelize.STRING(255),
  },
  dateBirth: {
    type: Sequelize.DATE,
  },
  placeWork: {
    type: Sequelize.STRING(255),
  },
  phoneNumber: {
    allowNull: false,
    type: Sequelize.STRING(255),
  },
  mail: {
    allowNull: false,
    type: Sequelize.STRING(255),
  },
  login: {
    allowNull: false,
    type: Sequelize.STRING(255),
  },
  password: {
    allowNull: false,
    type: Sequelize.STRING(255),
  },
  aboutMe: {
    type: Sequelize.TEXT,
  },
  departmentId: {
    allowNull: false,
    type: Sequelize.UUID,
    references: {
      model: 'department',
      key: 'id',
    },
  },
  roleId: {
    allowNull: false,
    type: Sequelize.UUID,
    references: {
      model: 'role',
      key: 'id',
    },
  },
});

export default User;
