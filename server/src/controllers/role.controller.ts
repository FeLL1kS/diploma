import {
  RoleAttributes,
  RoleCreationAttributes,
  RoleModel,
} from '../models/RoleModel';

async function GetRoleById(id: string): Promise<RoleAttributes | null> {
  const result: RoleAttributes | null = await RoleModel.findByPk(id) as RoleAttributes;

  return result;
}

async function CreateRole(role: RoleCreationAttributes): Promise<RoleAttributes> {
  const result: RoleAttributes = await RoleModel.create(role) as RoleAttributes;

  return result;
}

async function UpdateRole(role: RoleCreationAttributes): Promise<RoleAttributes | null> {
  const result: [number, RoleAttributes[]] = await RoleModel.update(role, {
    where: { id: role.id },
    returning: true,
  }) as [number, RoleAttributes[]];

  return result[1][0];
}

export default {
  GetRoleById,
  CreateRole,
  UpdateRole,
};
