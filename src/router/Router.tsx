import { FC, useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// Pages
import { Cart, Home, Login, PageNotFound, Product, Register, User } from "../pages";
import { Context } from "../context/Context";

const Router: FC = (): JSX.Element => {
  const { auth } = useContext(Context);

  return (
    <Routes>
      {/* <Route path="/" element={!!auth?.token ? <Home /> : <Navigate to="/login" />} /> */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={!!auth?.token ? <Navigate to="/" /> : <Login />} />
      <Route path="/register" element={!!auth?.token ? <Navigate to="/" /> : <Register />} />
      <Route path="/user" element={!!auth?.token ? <User /> : <Navigate to="/login" />} />
      <Route path="/cart" element={!!auth?.token ? <Cart /> : <Navigate to="/login" />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );

  // old routes
  // return (
  //   <Routes>
  //     <Route path="/" element={!!auth?.token ? <Home /> : <Navigate to="/login" />} />
  //     {!!!auth?.token ? (
  //       <Route>
  //         <Route path="/login" element={<Login />} />
  //         <Route path="/register" element={<Register />} />
  //       </Route>
  //     ) : (
  //       <>
  //         <Route path="/user" element={<User />} />
  //         <Route path="/cart" element={<Cart />} />
  //         <Route path="/product/:id" element={<Product />} />
  //       </>
  //     )}
  //     <Route path="*" element={<PageNotFound />} />
  //   </Routes>
  // );
};

export default Router;
