import * as Sequelize from "sequelize/types";
import SequelizeInstance from "../config/SequelizeInstance";

const Project_User = SequelizeInstance.getSequelizeInstance().define("project_user", {
  projectId: {
    allowNull: false,
    type: Sequelize.UUID,
    references: {
      model: 'project',
      key: 'id'
    },
  },
  userId: {
    allowNull: false,
    type: Sequelize.UUID,
    references: {
      model: 'user',
      key: 'id'
    },
  }
})

export default Project_User;