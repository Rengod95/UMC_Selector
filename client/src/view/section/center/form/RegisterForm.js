import React, { useContext, useEffect, useState } from "react";
import classes from "../../../../styles/center-side/reg-form.module.scss";
import useInput from "../../../../hooks/useInput";
import Button from "@mui/material/Button";
import useRegister from "../../../../hooks/useRegister";
import useCheckExistence from "../../../../hooks/useCheckExistence";

const RegisterForm = () => {
  const idInput = useInput();
  const passwordInput = useInput();
  const nameInput = useInput();
  const nicknameInput = useInput();
  const partNumberInput = useInput();

  const mutation = useRegister();
  const nicknameChecker = useCheckExistence(nicknameInput.value);
  const idChecker = useCheckExistence(idInput.value);

  const RegisterSubmitHandler = async (e) => {
    e.preventDefault();
    mutation.mutate({
      name: nameInput.value,
      nickname: nicknameInput.value,
      userId: idInput.value,
      password: passwordInput.value,
      partNumber: partNumberInput.value,
    });

    nameInput.resetInputValue();
    nicknameInput.resetInputValue();
    idInput.resetInputValue();
    passwordInput.resetInputValue();
    partNumberInput.resetInputValue();
  };

  const nicknameOnBlurHandler = () => {
    console.log("블러 진입");
    nicknameChecker.setCheckingValue({ nickname: nicknameInput.value });
  };

  const idOnBlurHandler = () => {
    idChecker.setCheckingValue({ userId: idInput.value });
  };

  return (
    <form className={classes.form} onSubmit={RegisterSubmitHandler}>
      <div className={classes.inputSection}>
        <div className={classes.inputContainer}>
          <input
            id={"name"}
            type="text"
            placeholder="Name"
            className={classes.input}
            onChange={nameInput.onChangeHandler}
            value={nameInput.value}
          />
          <div className={classes.inputAdditionalText}>{}</div>
        </div>
        <div className={classes.inputContainer}>
          <input
            id={"nickname"}
            type="text"
            placeholder="NickName"
            className={classes.input}
            onChange={nicknameInput.onChangeHandler}
            onBlur={nicknameOnBlurHandler}
            value={nicknameInput.value}
          />
          <div className={classes.inputAdditionalText}>
            {nicknameChecker.hasAlready && "중복된 닉네임 입니다."}
          </div>
        </div>
        <div className={classes.inputContainer}>
          <input
            id={"id"}
            type="text"
            placeholder="ID"
            className={classes.input}
            onChange={idInput.onChangeHandler}
            onBlur={idOnBlurHandler}
            value={idInput.value}
          />
          <div className={classes.inputAdditionalText}>
            {idChecker.hasAlready && "중복된 ID 입니다."}
          </div>
        </div>
        <div className={classes.inputContainer}>
          <input
            id={"password"}
            type="password"
            placeholder="Password"
            className={classes.input}
            onChange={passwordInput.onChangeHandler}
            value={passwordInput.value}
          />
          <div className={classes.inputAdditionalText}>{}</div>
        </div>
        <div className={classes.inputContainer}>
          <input
            id={"partNumber"}
            type="text"
            placeholder="Part Number"
            className={classes.input}
            onChange={partNumberInput.onChangeHandler}
            value={partNumberInput.value}
          />
          <div className={classes.inputAdditionalText}>{}</div>
        </div>
      </div>
      <div className={classes.buttonSection}>
        <div className={classes.buttonContainer}>
          <Button type="submit" variant={"contained"} size={"medium"}>
            SIGN UP
          </Button>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
