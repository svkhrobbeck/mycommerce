import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// Pages
import { Cart, Home, Login, PageNotFound, Product, Register, User } from "../pages";

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
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<Product />} />
        </>
      )}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Router;
