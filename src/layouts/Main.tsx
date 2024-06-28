import { FC } from "react";

import { IChildren } from "../interfaces";
import { Footer, Header } from "../components";

const MainLayout: FC<IChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
