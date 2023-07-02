// style
import "./index.css";

import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import ContextProvider from "./context/Context";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ContextProvider>
);
