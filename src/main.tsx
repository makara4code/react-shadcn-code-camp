import "./styles/index.css";

import { App } from "./App";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { Toaster } from "@/components/ui/toaster";
import store from "./store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
    <Toaster />
  </Provider>
);
