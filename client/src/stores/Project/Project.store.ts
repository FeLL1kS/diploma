import { ErrorResponse, ProjectDTO, VacancyDTO, VacancyUserDTO } from "diploma";
import { makeAutoObservable } from "mobx";
import { HttpStatusCode } from "../../enums";
import { axiosFetchFunction, axiosPostFunction, IResponse } from "../../helpers/axiosInstance";

export class ProjectStore {
  public state: 'loading' | 'loaded' | 'error' = 'loading';
  
  private errorMessage: string | null = null;

  private id: string | null = null;

  public project: ProjectDTO | null = null;

  public projectVacancies: VacancyDTO[] | null = null;

  constructor() {
    makeAutoObservable(this);
  }
  
  public setProjectId = async (id: string): Promise<void> => {
    this.id = id;
    await this.fetchData();
  }

  public setErrorMessage = (message: string | null): void => {
    this.errorMessage = message;
  }

  public getErrorMessage = (): string | null => {
    const errorMessage: string | null = this.errorMessage;
    this.setErrorMessage(null);
    return errorMessage;
  }

  private fetchData = async (): Promise<void> => {
    try {
      const projectResponse: IResponse<ProjectDTO> | ErrorResponse = await axiosFetchFunction(`/projects/${this.id}`);
      
      if (projectResponse.status !== HttpStatusCode.OK) {
        this.setErrorMessage((projectResponse as ErrorResponse).message);
        return;
      }
      
      this.project = (projectResponse as IResponse<ProjectDTO>).data;

      const projectVacanciesResponse: IResponse<VacancyDTO[]> | ErrorResponse = await axiosFetchFunction(`/projects/${this.id}/vacancies`);
      
      if (projectVacanciesResponse.status !== HttpStatusCode.OK) {
        this.setErrorMessage((projectVacanciesResponse as ErrorResponse).message);
        return;
      }
      
      this.projectVacancies = (projectVacanciesResponse as IResponse<VacancyDTO[]>).data;
      
      this.state = 'loaded';
    } catch {
      this.state = 'error';
    }
  }

  public addUserToProjectVacancy = async (vacancyId: string): Promise<void> => {
    try {
      if (!this.project)
      {
        return;
      }
    
      const response: IResponse<VacancyUserDTO> | ErrorResponse = await axiosPostFunction(`/projects/vacancies/${vacancyId}/addUser`);
      
      if (response.status !== HttpStatusCode.OK) {
        this.setErrorMessage((response as ErrorResponse).message);
        return;
      }
      
      this.project.team.push((response as IResponse<VacancyUserDTO>).data.user);

      this.projectVacancies = this.projectVacancies!.map((vacancy: VacancyDTO) => {
        if (vacancy.id === (response as IResponse<VacancyUserDTO>).data.vacancyId) {
          vacancy.currentNumber++;
        }

        return vacancy;
      })
    } catch {
      this.state = 'error';
    }
  }
}