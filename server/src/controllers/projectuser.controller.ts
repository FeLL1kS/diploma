import * as Sequelize from 'sequelize';
import {
  ProjectUserAttributes,
  ProjectUserCreationAttributes,
  ProjectUserModel,
} from '../models/ProjectUserModel';

async function GetByCondition(options: Sequelize.FindOptions<ProjectUserAttributes>):
Promise<ProjectUserAttributes | null> {
  const result: ProjectUserAttributes | null = await ProjectUserModel
    .findOne(options) as ProjectUserAttributes;

  return result;
}

async function Create(projectUser: ProjectUserCreationAttributes): Promise<ProjectUserAttributes> {
  const result: ProjectUserAttributes = await ProjectUserModel
    .create(projectUser) as ProjectUserAttributes;

  return result;
}

async function Delete(projectId: string, userId: string): Promise<boolean> {
  const result = await ProjectUserModel.destroy({
    where: {
      projectId,
      userId,
    },
  });

  return Boolean(result);
}

export default {
  GetByCondition,
  Create,
  Delete,
};
