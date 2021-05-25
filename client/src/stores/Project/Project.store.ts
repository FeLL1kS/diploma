import { UserAttributes } from "diploma";
import { makeAutoObservable } from "mobx";
import { axiosFetchFunction, axiosPostFunction } from "../../helpers/axiosInstance";
import { ProjectResponse } from "../Projects/Projects.interface";

export class ProjectStore {
  public state: 'loading' | 'loaded' | 'error' = 'loading';
  
  public errorMessage: string | null = null;

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

  public addUserToProject = async (): Promise<void> => {
    try {
      if (!this.project)
      {
        return;
      }
    
      const user: UserAttributes = await axiosPostFunction(`/projects/addUser`, {
        projectId: this.project.id,
      });
      
      this.project.team.push(user);
    } catch {
      this.state = 'error';
    }
  }

  public setProjectId = async (id: string): Promise<void> => {
    this.id = id;
    await this.fetchProject();
  }
}