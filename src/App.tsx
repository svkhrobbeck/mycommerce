import { useState, useEffect, FC } from "react";

import { TOKEN_LOCALSTORAGE } from "./constants/constants";
import { removeStorage } from "./helpers/localStorage";
import { useMyContext } from "./context/Context";
import AuthService from "./service/auth";
import "./service/axios";

import { Loader } from "./components";
import Router from "./router/Router";

const App: FC = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { auth, setAuth } = useMyContext();

  const getUser = async () => {
    setIsLoading(true);
    try {
      if (!!!auth?.token) throw new Error("User not logged in");
      const user = await AuthService.userGet();
      setAuth(prev => ({ ...prev, user }));
    } catch (error) {
      console.log(error);
      setAuth({});
      removeStorage(TOKEN_LOCALSTORAGE);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (auth?.token) getUser();
  }, [auth?.token]);

  return <main>{isLoading ? <Loader /> : <Router />}</main>;
};

export default App;
