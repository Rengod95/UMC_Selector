import React from "react";
import TotalPage from "./view/pages/TotalPage";
import ContextProvider from "./store/context/ContextProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router-dom";
import "./App.scss";

const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ContextProvider>
            <TotalPage />
          </ContextProvider>
        </BrowserRouter>
        {/*<ReactQueryDevtools></ReactQueryDevtools>*/}
      </QueryClientProvider>
    </>
  );
};

export default App;
