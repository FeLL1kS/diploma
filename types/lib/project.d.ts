import * as Sequelize from 'sequelize';

export interface ProjectAttributes {
  id: string;
  title: string;
  description: string;
  dateBegin: Date;
  dateEnd: Date;
  controlPoints: string;
  result: string;
}

export interface ProjectCreationAttributes
  extends Sequelize.Optional<ProjectAttributes, 'id' | 'controlPoints' | 'result'> {}

export interface ProjectInstance
  extends Sequelize.Model<ProjectAttributes, ProjectCreationAttributes>,
    ProjectAttributes {}
