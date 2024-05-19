import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import * as Pages from "../pages";
import * as Layouts from "../layouts";
import { useMyContext } from "../context/Context";

const Router: FC = (): JSX.Element => {
  const { auth } = useMyContext();

  if (!auth?.token && !auth?.user) {
    return (
      <Layouts.Auth>
        <Routes>
          <Route path="/login" element={<Pages.Login />} />
          <Route path="/register" element={<Pages.Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Layouts.Auth>
    );
  }
  return (
    <Layouts.Main>
      <Routes>
        <Route path="/" element={<Pages.Home />} />
        <Route path="/" element={<Pages.Home />} />
        <Route path="/cart" element={<Pages.Cart />} />
        <Route path="/user" element={<Pages.User />} />
        <Route path="/product/:id" element={<Pages.Product />} />
        <Route path="*" element={<Pages.PageNotFound />} />
      </Routes>
    </Layouts.Main>
  );
};

export default Router;
