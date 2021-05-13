import * as Sequelize from 'sequelize';
import SequelizeInstance from '../config/SequelizeInstance';

export interface ProjectAttributes {
  id: string;
  title: string;
  description: string;
  dateBegin: Date;
  dateEnd: Date;
  controlPoints: string;
  result: string;
}

export interface ProjectCreationAttributes
  extends Sequelize.Optional<ProjectAttributes, 'id' | 'controlPoints' | 'result'> {}

export interface ProjectInstance
  extends Sequelize.Model<ProjectAttributes, ProjectCreationAttributes>,
    ProjectAttributes {}

export const ProjectModel = SequelizeInstance.getSequelizeInstance().define<ProjectInstance>('projects', {
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
