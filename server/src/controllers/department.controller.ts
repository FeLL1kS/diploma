import {
  DepartmentAttributes,
  DepartmentCreationAttributes,
  DepartmentModel,
} from '../models/DepartmentModel';

async function GetById(id: string): Promise<DepartmentAttributes | null> {
  const result: DepartmentAttributes | null = await DepartmentModel
    .findByPk(id) as DepartmentAttributes;

  return result;
}

async function Create(department: DepartmentCreationAttributes): Promise<DepartmentAttributes> {
  const result: DepartmentAttributes = await DepartmentModel
    .create(department) as DepartmentAttributes;

  return result;
}

async function Update(department: DepartmentCreationAttributes):
Promise<DepartmentAttributes | null> {
  const result: [number, DepartmentAttributes[]] = await DepartmentModel
    .update(department, {
      where: { id: department.id },
      returning: true,
    }) as [number, DepartmentAttributes[]];

  return result[1][0];
}

async function DeleteById(id: string): Promise<boolean> {
  const result = await DepartmentModel.destroy({
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
