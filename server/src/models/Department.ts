import * as Sequelize from "sequelize/types";
import SequelizeInstance from "../config/SequelizeInstance";
import Group from "./Group";

const Department = SequelizeInstance.getSequelizeInstance().define("department", {
  id: {
    allowNull: false,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  },
  departmentName: {
    allowNull: false,
    type: Sequelize.STRING(255)
  }
})

export default Department;