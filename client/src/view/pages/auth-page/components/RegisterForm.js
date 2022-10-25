import React, { useState } from "react";
import classes from "../../../../styles/auth-page/reg-form.module.scss";
import useInput from "../../../../hooks/useInput";
import Button from "@mui/material/Button";
import useRegister from "../../../../hooks/useRegister";
import REQUESTER from "../../../../api/requester";

const RegisterForm = () => {
  const idInput = useInput();
  const passwordInput = useInput();
  const nameInput = useInput();
  const nicknameInput = useInput();
  const partNumberInput = useInput();

  const mutationTrigger = useRegister();
  const [nicknameCheck, setNicknameCheck] = useState(false);
  const [idCheck, setIdCheck] = useState(false);

  const RegisterSubmitHandler = async (e) => {
    e.preventDefault();

    await mutationTrigger({
      name: nameInput.value,
      nickname: nicknameInput.value,
      userId: idInput.value,
      password: passwordInput.value,
      partNumber: partNumberInput.value,
    });
  };

  const nicknameOnBlurHandler = async () => {
    console.log("블러 진입");
    await REQUESTER.checkExistenceRequester({ nickname: nicknameInput.value })
      .then((res) => {
        console.log(res);
        setNicknameCheck(() => res.data.existence);
      })
      .catch((e) => console.log(e));
    console.log("블러 아웃");
  };

  const idOnBlurHandler = () => {
    REQUESTER.checkExistenceRequester({ userId: idInput.value })
      .then((res) => {
        setIdCheck(() => res.data.existence);
      })
      .catch((e) => console.log(e));
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
            placeholder="nickname"
            className={classes.input}
            onChange={nicknameInput.onChangeHandler}
            onBlur={nicknameOnBlurHandler}
            value={nicknameInput.value}
          />
          <div className={classes.inputAdditionalText}>
            {nicknameCheck && "중복된 닉네임 입니다."}
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
            {idCheck && "중복된 ID 입니다."}
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
