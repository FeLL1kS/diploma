import {
  UserAttributes,
  UserCreationAttributes,
  UserModel,
} from '../models/UserModel';

async function GetById(id: string): Promise<UserAttributes | null> {
  const result: UserAttributes | null = await UserModel.findByPk(id) as UserAttributes;

  return result;
}

async function Create(user: UserCreationAttributes): Promise<UserAttributes> {
  const result: UserAttributes = await UserModel.create(user) as UserAttributes;

  return result;
}

async function Update(user: UserCreationAttributes): Promise<UserAttributes | null> {
  const result: [number, UserAttributes[]] = await UserModel.update(user, {
    where: { id: user.id },
    returning: true,
  }) as [number, UserAttributes[]];

  return result[1][0];
}

async function DeleteById(id: string): Promise<boolean> {
  const result = await UserModel.destroy({
    where: {
      id,
    },
  });

  return Boolean(result);
}

export default {
  GetById,
  Create,
  Update,
  DeleteById,
};
