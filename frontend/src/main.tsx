import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./App";
import { Provider } from "react-redux";
import { store } from "./redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./style/normalize.scss";
import "./style/baseline.scss";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         networkMode: "offlineFirst",
         refetchOnWindowFocus: false
      },
   },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
   <Provider store={ store }>
      <QueryClientProvider client={ queryClient }>
         <App/>
         <ReactQueryDevtools/>
      </QueryClientProvider>
   </Provider>,
);
