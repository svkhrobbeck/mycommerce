import { FC, createContext, useState } from "react";
import { IAuth, IChildren, IContextType } from "../interfaces";

const initialValue: IAuth = { token: null, user: null };

export const Context = createContext<IContextType>({ auth: initialValue, setAuth: () => {} });

const ContextProvider: FC<IChildren> = ({ children }): JSX.Element => {
  const [auth, setAuth] = useState<IAuth>(initialValue);

  return <Context.Provider value={{ auth, setAuth }}>{children}</Context.Provider>;
};

export default ContextProvider;
