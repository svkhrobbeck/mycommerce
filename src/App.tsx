import { FC, useState, useContext, useEffect } from "react";
import "./service/axios";
import { Footer, Header, Loader } from "./components";
import Router from "./router/Router";
import { Context } from "./context/Context";
import AuthService from "./service/auth";
import { removeStorage } from "./helpers/localStorage";
import { TOKEN_LOCALSTORAGE } from "./constants/constants";

const App: FC = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { auth, setAuth } = useContext(Context);

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

  return (
    <>
      <Header />
      <main className="flex-grow-[1] flex flex-col">{isLoading ? <Loader /> : <Router />}</main>
      <Footer />
    </>
  );
};

export default App;
