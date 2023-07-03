import { FC } from "react";
import "./service/axios";
import { Footer, Header } from "./components";
import Router from "./router/Router";
const App: FC = (): JSX.Element => {
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
