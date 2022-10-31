import React from "react";
import TotalPage from "./view/pages/TotalPage";
import ContextProvider from "./store/context/ContextProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import "./App.scss";

const queryClient = new QueryClient();

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ContextProvider>
          <TotalPage />
        </ContextProvider>
        <ReactQueryDevtools></ReactQueryDevtools>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
