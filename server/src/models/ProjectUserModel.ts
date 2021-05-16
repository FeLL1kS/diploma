import * as Sequelize from 'sequelize';
import { ProjectUserInstance } from 'diploma';
import SequelizeInstance from '../config/SequelizeInstance';

const ProjectUserModel = SequelizeInstance.getSequelizeInstance()
  .define<ProjectUserInstance>(
    'projects_users',
    {
      projectId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'projects',
          key: 'id',
        },
      },
      userId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
      },
    },
  );

ProjectUserModel.removeAttribute('id');

export default ProjectUserModel;
