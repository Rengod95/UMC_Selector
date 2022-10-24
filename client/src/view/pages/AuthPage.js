import React from "react";
import { Route, Routes } from "react-router-dom";
import RegisterForm from "../section/center/form/RegisterForm";
import LoginForm from "../section/center/form/LoginForm";
import classes from "../../styles/pages/AuthPage.module.scss";

const AuthPage = () => {
  return (
    <div className={classes.cardContainer}>
      <Routes>
        <Route path={"/register"} element={<RegisterForm />} />
        <Route path={"/login"} element={<LoginForm />} />
      </Routes>
    </div>
  );
};

export default AuthPage;
