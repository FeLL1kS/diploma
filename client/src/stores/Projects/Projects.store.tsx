import { makeAutoObservable } from "mobx";
import { axiosFetchFunction } from "../../helpers/axiosInstance";
import { ProjectResponse } from "./Projects.interface";

export class ProjectsStore {
  public state: 'loading' | 'loaded' | 'error' = 'loading';

  public projects: ProjectResponse[] | null = null;

  constructor() {
    makeAutoObservable(this);
    this.fetchAllProjects();
  }

  private fetchAllProjects = async (): Promise<void> => {
    try {
      const projects: ProjectResponse[] = await axiosFetchFunction('/projects');

      this.projects = projects;
      this.state = 'loaded';
    } catch {
      this.state = 'error';
    }
  }
}