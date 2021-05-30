import { ProjectDTO } from "diploma";

export interface ProjectCreatedResponse {
  message: string;
  project: ProjectDTO;
}
