import { ProjectCreationAttributes, ProjectDTO } from "diploma";
import { makeAutoObservable } from "mobx";
import { axiosFetchFunction, axiosPostFunction } from "../../helpers/axiosInstance";
import { ProjectCreatedResponse } from "./Projects.interface";

export class ProjectsStore {
  public state: 'loading' | 'loaded' | 'error' = 'loading';

  public projects: ProjectDTO[] | null = null;

  constructor() {
    makeAutoObservable(this);
    this.fetchAllProjects();
  }

  private fetchAllProjects = async (): Promise<void> => {
    try {
      const projects: ProjectDTO[] = await axiosFetchFunction<ProjectDTO[]>('/projects');

      this.projects = projects;
      this.state = 'loaded';
    } catch {
      this.state = 'error';
    }
  }

  public createProject = async (project: ProjectCreationAttributes): Promise<void> => {
    try {
      const result: ProjectCreatedResponse = await axiosPostFunction('/projects', project);

      this.projects?.push(result.project);
    } catch {
      this.state = 'error';
    }
  }
}