import { Dispatch, SetStateAction } from "react";
import { useSearchParams } from "react-router-dom";

export interface IStyles {
  flexBetween: string;
  flexStart: string;
  flexEnd: string;
  flexCenter: string;
  container: string;
  paragraph: string;
  flexCol: string;
  py: string;
  buttonPurpleOutlined: string;
  buttonPurple: string;
  buttonYellow: string;
  badgeYellow: string;
  buttonGreen: string;
  buttonLightGray: string;
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
  message: string[];
  statusCode: number;
  error: string;
}

export interface IProduct {
  id: number;
  title: string;
  price: number;
  description?: string;
  images: string[];
  creationAt?: string;
  updatedAt?: string;
  category?: IProductCategory;
}

export interface IProductCategory {
  id: number;
  name: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}

export interface IParams {
  offset?: number;
  limit?: number;
  price_min?: string | null;
  price_max?: string | null;
  categoryId?: number | null;
  title?: string | null;
}

export type TypeSearchParams = ReturnType<typeof useSearchParams>;
