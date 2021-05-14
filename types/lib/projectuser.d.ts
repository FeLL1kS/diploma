import * as Sequelize from 'sequelize';

export interface ProjectUserAttributes {
  projectId: string;
  userId: string;
}

export interface ProjectUserCreationAttributes
  extends ProjectUserAttributes {}

export interface ProjectUserInstance
  extends Sequelize.Model<ProjectUserAttributes, ProjectUserCreationAttributes>,
    ProjectUserAttributes {}
