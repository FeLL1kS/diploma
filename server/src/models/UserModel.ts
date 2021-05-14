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
  roleId: string;
}

export interface UserCreationAttributes
  extends Sequelize.Optional<UserAttributes, 'id' | 'patronymic' | 'dateBirth' | 'placeWork' | 'aboutMe' | 'roleId'> {}

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
        model: 'departments',
        key: 'id',
      },
    },
    roleId: {
      allowNull: false,
      type: Sequelize.UUID,
      defaultValue: 'b675969b-5ed1-4f56-a888-a96ee4874402',
      references: {
        model: 'roles',
        key: 'id',
      },
    },
  },
);
