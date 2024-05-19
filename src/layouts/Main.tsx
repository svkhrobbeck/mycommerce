import { FC } from "react";

import { IChildren } from "../interfaces";
import { Footer, Header } from "../components";

const MainLayout: FC<IChildren> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
