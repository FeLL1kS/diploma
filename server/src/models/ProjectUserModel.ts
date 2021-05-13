import * as Sequelize from 'sequelize';
import SequelizeInstance from '../config/SequelizeInstance';

export interface ProjectUserAttributes {
  projectId: string;
  userId: string;
}

export interface ProjectUserCreationAttributes
  extends ProjectUserAttributes {}

export interface ProjectUserInstance
  extends Sequelize.Model<ProjectUserAttributes, ProjectUserCreationAttributes>,
    ProjectUserAttributes {}

export const ProjectUserModel = SequelizeInstance.getSequelizeInstance()
  .define<ProjectUserInstance>(
    'projects_users',
    {
      projectId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'project',
          key: 'id',
        },
      },
      userId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'user',
          key: 'id',
        },
      },
    },
  );
