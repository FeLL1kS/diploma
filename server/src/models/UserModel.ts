import * as Sequelize from 'sequelize';
import SequelizeInstance from '../config/SequelizeInstance';

export interface UserAttributes {
  id: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  dateBirth: Date;
  placeWork: string;
  phoneNumber: string;
  mail: string;
  login: string;
  password: string;
  aboutMe: string;
  departmentId: string;
  UserId: string;
}

export interface UserCreationAttributes
  extends Sequelize.Optional<UserAttributes, 'id' | 'patronymic' | 'dateBirth' | 'placeWork' | 'aboutMe'> {}

export interface UserInstance
  extends Sequelize.Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {}

export const UserModel = SequelizeInstance.getSequelizeInstance().define<UserInstance>(
  'users',
  {
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
    UserId: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: 'User',
        key: 'id',
      },
    },
  },
);
