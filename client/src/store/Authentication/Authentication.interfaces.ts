export interface UserData {
  _id: string;
  mail: string;
  firstName: string;
  lastName: string;
}

export interface IUserResponse {
  token: string;
  user: UserData;
}
