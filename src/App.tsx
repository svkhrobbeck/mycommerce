import { FC, useContext, useEffect } from "react";
import "./service/axios";
import { Footer, Header } from "./components";
import Router from "./router/Router";
import AuthService from "./service/auth";
import { Context } from "./context/Context";

const App: FC = (): JSX.Element => {
  const { setAuth } = useContext(Context);

  const getUser = async () => {
    try {
      const user = await AuthService.userGet();
      setAuth(prev => ({ ...prev, user }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Header />
      <main className="flex-grow-[1] flex flex-col">
        <Router />
      </main>
      <Footer />
    </>
  );
};

export default App;
