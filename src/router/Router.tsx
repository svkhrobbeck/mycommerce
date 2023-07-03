import { FC, useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// Pages
import { Cart, Home, Login, PageNotFound, Product, Register, User } from "../pages";
import { Context } from "../context/Context";

const Router: FC = (): JSX.Element => {
  const { auth } = useContext(Context);

  return (
    <Routes>
      <Route path="/" element={!!auth?.token ? <Home /> : <Navigate to="/login" />} />
      {!!!auth?.token ? (
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
