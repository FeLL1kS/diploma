import { ProjectDTO, VacancyDTO } from "diploma";
import { makeAutoObservable } from "mobx";
import { axiosFetchFunction, axiosPostFunction } from "../../helpers/axiosInstance";
import { VacancyUserCreatedResponse } from "./Project.interface";

export class ProjectStore {
  public state: 'loading' | 'loaded' | 'error' = 'loading';
  
  public errorMessage: string | null = null;

  private id: string | null = null;

  public project: ProjectDTO | null = null;

  public projectVacancies: VacancyDTO[] | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  private fetchData = async (): Promise<void> => {
    try {
      const project: ProjectDTO = await axiosFetchFunction(`/projects/${this.id}`);
      this.project = project;

      const projectVacancies: VacancyDTO[] = await axiosFetchFunction(`/projects/${this.id}/vacancies`);
      this.projectVacancies = projectVacancies;
      
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
    
      const response: VacancyUserCreatedResponse = await axiosPostFunction(`/projects/vacancies/${vacancyId}/addUser`);
      
      this.project.team.push(response.vacancyUser.user);

      this.projectVacancies = this.projectVacancies!.map((vacancy: VacancyDTO) => {
        if (vacancy.id === response.vacancyUser.vacancyId) {
          vacancy.currentNumber++;
        }

        return vacancy;
      })
    } catch {
      this.state = 'error';
    }
  }

  public setProjectId = async (id: string): Promise<void> => {
    this.id = id;
    await this.fetchData();
  }
}