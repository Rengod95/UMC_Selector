import React from "react";
import AuthPage from "./auth-page/AuthPage";
import { Route, Routes, Navigate } from "react-router-dom";
import MainTop from "./main-page/components/MainTop";

const TotalPage = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Navigate to={"/main"} />}></Route>
      <Route path={"/register"} element={<AuthPage />} />
      <Route path={"/login"} element={<AuthPage />} />
      <Route path={"/main"} element={<MainTop />} />
    </Routes>
  );
};

export default TotalPage;
