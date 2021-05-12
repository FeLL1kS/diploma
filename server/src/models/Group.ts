import * as Sequelize from "sequelize/types";
import SequelizeInstance from "../config/SequelizeInstance";

const Group = SequelizeInstance.getSequelizeInstance().define("group", {
  id: {
    allowNull: false,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  },
  course: {
    allowNull: false,
    type: Sequelize.STRING(1)
  },
  group: {
    allowNull: false,
    type: Sequelize.STRING(5)
  },
  departmentId: {
    allowNull: false,
    type: Sequelize.UUID,
    references: {
      model: 'department',
      key: 'id'
    },
  }
})

export default Group;