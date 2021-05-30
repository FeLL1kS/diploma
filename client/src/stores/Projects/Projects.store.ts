import { ErrorResponse, ProjectCreationAttributes, ProjectDTO } from "diploma";
import { makeAutoObservable } from "mobx";
import { HttpStatusCode } from "../../enums";
import { IResponse, axiosFetchFunction, axiosPostFunction } from "../../helpers/axiosInstance";

export class ProjectsStore {
  public state: 'loading' | 'loaded' | 'error' = 'loading';

  public errorMessage: string | null = null;

  public projects: ProjectDTO[] | null = null;

  constructor() {
    makeAutoObservable(this);
    this.fetchAllProjects();
  }

  public setErrorMessage = (message: string | null): void => {
    this.errorMessage = message;
  }

  public createProject = async (project: ProjectCreationAttributes): Promise<boolean> => {
    try {
      this.setErrorMessage(null);
      const response: IResponse<ProjectDTO> | ErrorResponse = await axiosPostFunction('/projects', project);
      
      if (response.status !== HttpStatusCode.OK) {
        this.setErrorMessage((response as ErrorResponse).message);
        return false;
      }
      
      this.projects?.push((response as IResponse<ProjectDTO>).data);
    } catch {
      this.state = 'error';
    }
    return true;
  }

  private fetchAllProjects = async (): Promise<void> => {
    try {
      this.setErrorMessage(null);
      const response: IResponse<ProjectDTO[]> | ErrorResponse = await axiosFetchFunction<ProjectDTO[]>('/projects');

      if (response.status !== HttpStatusCode.OK) {
        this.setErrorMessage((response as ErrorResponse).message);
        return;
      }
      
      this.projects = (response as IResponse<ProjectDTO[]>).data;
      this.state = 'loaded';
    } catch {
      this.state = 'error';
    }
  }

}