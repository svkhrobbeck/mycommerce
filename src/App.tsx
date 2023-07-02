import { FC, useContext, useEffect, useState } from "react";
import "./service/axios";
import { Footer, Header } from "./components";
import Router from "./router/Router";
import AuthService from "./service/auth";
import { Context } from "./context/Context";
import { styles } from "./constants/styles";

const App: FC = (): JSX.Element => {
  const { setAuth } = useContext(Context);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getUser = async () => {
    setIsLoading(true);
    try {
      const user = await AuthService.userGet();
      setAuth(prev => ({ ...prev, user }));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Header />
      <main className="flex-grow-[1] flex flex-col">
        {isLoading ? <div className={`${styles.container} py-4 md:py-6`}>Loading...</div> : <Router />}
      </main>
      <Footer />
    </>
  );
};

export default App;
