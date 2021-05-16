import { UserAttributes } from "diploma";

export interface ProjectResponse {
  id: string;
  title: string;
  description: string;
  dateBegin: Date;
  dateEnd: Date;
  controlPoints: string;
  result: string;
  manager: UserAttributes;
  team: UserAttributes[];
}
