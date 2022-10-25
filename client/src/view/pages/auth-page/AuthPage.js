import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import classes from "../../../styles/auth-page/AuthPage.module.scss";

const AuthPage = () => {
  const location = useLocation();
  console.log(location);
  return (
    <div className={classes.cardContainer}>
      {location.pathname === "/register" && <RegisterForm />}
      {location.pathname === "/login" && <LoginForm />}
    </div>
  );
};

export default AuthPage;
