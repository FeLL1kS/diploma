import {
  ProjectUserAttributes,
  ProjectUserCreationAttributes,
  ProjectUserModel,
} from '../models/ProjectUserModel';

async function GetById(id: string): Promise<ProjectUserAttributes | null> {
  const result: ProjectUserAttributes | null = await ProjectUserModel
    .findByPk(id) as ProjectUserAttributes;

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
  GetById,
  Create,
  Delete,
};
