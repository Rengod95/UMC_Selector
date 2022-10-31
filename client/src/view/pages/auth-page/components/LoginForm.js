import React, { useEffect, useState } from "react";
import classes from "../../../../styles/auth-page/loginForm.module.scss";
import useInput from "../../../../hooks/useInput";
import useRegister from "../../../../hooks/useRegister";
import Button from "@mui/material/Button";
import useLogin from "../../../../hooks/useLogin";

const LoginForm = () => {
  const idInput = useInput();
  const passwordInput = useInput();
  const trigger = useLogin();

  const loginSubmitHandler = (e) => {
    e.preventDefault();
    trigger({ userId: idInput.value, password: passwordInput.value });
    idInput.resetInputValue();
    passwordInput.resetInputValue();
  };

  return (
    <form className={classes.form} onSubmit={loginSubmitHandler}>
      <div className={classes.inputSection}>
        <div className={classes.inputContainer}>
          <input
            id={"userId"}
            type="text"
            placeholder={"User ID"}
            onChange={idInput.onChangeHandler}
            value={idInput.value}
            className={classes.input}
          />
        </div>

        <div className={classes.inputContainer}>
          <input
            id={"password"}
            type="password"
            placeholder={"Password"}
            onChange={passwordInput.onChangeHandler}
            value={passwordInput.value}
            className={classes.input}
          />
        </div>
      </div>
      <div className={classes.buttonSection}>
        <div className={classes.buttonContainer}>
          <Button type="submit" variant={"contained"} size={"medium"}>
            SIGN IN
          </Button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
