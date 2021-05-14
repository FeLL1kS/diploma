import * as Sequelize from 'sequelize';
import {
  UserAttributes,
  UserCreationAttributes,
} from 'diploma';
import UserModel from '../models/UserModel';

async function GetByCondition(options: Sequelize.FindOptions<UserAttributes>):
Promise<UserAttributes | null> {
  const result: UserAttributes | null = await UserModel.findOne(options) as UserAttributes;

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
  GetByCondition,
  Create,
  Update,
  DeleteById,
};
