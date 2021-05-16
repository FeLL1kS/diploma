import { makeAutoObservable } from "mobx";
import { axiosFetchFunction } from "../../helpers/axiosInstance";
import { ProjectResponse } from "../Projects/Projects.interface";

export class ProjectStore {
  public state: 'loading' | 'loaded' | 'error' = 'loading';

  private id: string | null = null;

  public project: ProjectResponse | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  private fetchProject = async (): Promise<void> => {
    try {
      const project: ProjectResponse = await axiosFetchFunction(`/projects/${this.id}`);

      this.project = project;
      this.state = 'loaded';
    } catch {
      this.state = 'error';
    }
  }

  public setProjectId = async (id: string): Promise<void> => {
    this.id = id;
    await this.fetchProject();
  }
}