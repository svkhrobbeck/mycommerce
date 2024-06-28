import { FC } from "react";

import { IChildren } from "../interfaces";
import { Header } from "../components";

const AuthLayout: FC<IChildren> = ({ children }) => {
  return (
    <>
      <Header isMain={false} />
      <main>{children}</main>
    </>
  );
};

export default AuthLayout;
