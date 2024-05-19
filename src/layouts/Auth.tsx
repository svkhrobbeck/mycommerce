import { FC } from "react";

import { IChildren } from "../interfaces";

const AuthLayout: FC<IChildren> = ({ children }) => {
  return <div>{children}</div>;
};

export default AuthLayout;
