import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// Pages
import { Home, Login, PageNotFound, Register, User } from "../pages";

const Router: FC = (): JSX.Element => {
  const token: string | null = localStorage.getItem("a@t#k$n");
  return (
    <Routes>
      <Route path="/" element={!!token?.trim() ? <Home /> : <Navigate to="/login" />} />
      {!!!token ? (
        <Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      ) : (
        <>
          <Route path="/user" element={<User />} />
        </>
      )}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Router;
