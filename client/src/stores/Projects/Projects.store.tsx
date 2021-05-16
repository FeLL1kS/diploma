import { ProjectAttributes } from "diploma";
import { makeAutoObservable } from "mobx";
import { axiosFetchFunction } from "../../helpers/axiosInstance";

export class ProjectsStore {
  public state: 'loading' | 'loaded' | 'error' = 'loading';

  public projects: ProjectAttributes[] | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  public fetchAllProjects = async (): Promise<void> => {
    try {
      const projects: ProjectAttributes[] = await axiosFetchFunction('/projects');

      this.projects = projects;
    } catch {
      this.state = 'error';
    }
  }
}