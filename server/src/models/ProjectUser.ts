import * as Sequelize from 'sequelize';
import SequelizeInstance from '../config/SequelizeInstance';

const ProjectUser = SequelizeInstance.getSequelizeInstance().define('project_user', {
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
});

export default ProjectUser;
