import { Dispatch, ReactNode, SetStateAction } from "react";
import { useSearchParams } from "react-router-dom";

export type IChildren = Readonly<{ children: ReactNode }>;

export interface ISocials {
  link: string;
  icon: string;
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
  modal?: boolean;
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
  id?: number;
  title?: string;
  price?: number;
  description?: string;
  images?: string[];
  creationAt?: string;
  updatedAt?: string;
  category?: IProductCategory;
  count?: number;
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

export type TypeStateSetter = Dispatch<React.SetStateAction<IProduct[]>>;
