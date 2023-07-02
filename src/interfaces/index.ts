import { Dispatch, SetStateAction } from "react";

export interface IStyles {
  flexBetween: string;
  flexStart: string;
  flexEnd: string;
  flexCenter: string;
  container: string;
  paragraph: string;
}

export interface ISocials {
  link: string;
  icon: string;
}

export interface IChildren {
  children: JSX.Element;
}

export interface IUser {
  id?: number;
  email?: string;
  password?: string;
  name?: string;
  role?: string;
  avatar?: string;
  creationAt?: string;
  updatedAt?: string;
}

export interface IAuth {
  token?: string | null;
  user?: IUser | null;
}

export interface IContextType {
  auth?: IAuth;
  setAuth: React.Dispatch<React.SetStateAction<IAuth>>;
}

export interface ICustomInput {
  type: string;
  placeholder: string;
  styles: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

export interface IAuthUser {
  name?: string;
  email: string;
  password: string;
  avatar?: null | string;
}

export interface IAxiosResponse {
  response: {
    data: IAxiosData;
  };
}

export interface IAxiosData {
  [key: string]: string | number;
  message: string;
  statusCode: number;
}
