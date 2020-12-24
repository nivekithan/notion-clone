import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App.tsx";
import "./tailwind.output.css";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

ReactDOM.render(
<<<<<<< HEAD
  <QueryClientProvider client={    queryClient}>
=======
  <QueryClientProvider client={ queryClient }>
>>>>>>> gitTesting
      <App />
  </QueryClientProvider>,
  document.getElementById("root")
);
