import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App.tsx";
import "./tailwind.output.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <App />
    </Provider>
  </QueryClientProvider>,
  document.getElementById("root")
);
