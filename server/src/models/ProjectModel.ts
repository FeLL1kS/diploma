import * as Sequelize from 'sequelize';
import { ProjectInstance } from 'diploma';
import SequelizeInstance from '../config/SequelizeInstance';

export default SequelizeInstance.getSequelizeInstance().define<ProjectInstance>('projects', {
  id: {
    allowNull: false,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
  },
  title: {
    allowNull: false,
    type: Sequelize.STRING(255),
  },
  description: {
    allowNull: false,
    type: Sequelize.TEXT,
  },
  dateBegin: {
    allowNull: false,
    type: Sequelize.DATE,
  },
  dateEnd: {
    allowNull: false,
    type: Sequelize.DATE,
  },
  controlPoints: {
    type: Sequelize.TEXT,
  },
  result: {
    type: Sequelize.TEXT,
  },
});
