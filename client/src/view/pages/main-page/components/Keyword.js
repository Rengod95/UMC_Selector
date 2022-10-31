import React, { useState } from "react";
import Button from "@mui/material/Button";
import classes from "./Keyword.module.scss";
import REQUESTER from "../../../../api/requester";
import useKeyword from "../../../../hooks/useKeyword";

const Keyword = (props) => {
  const { keywordName, keywordNumber, selector } = props;
  const control = useKeyword(keywordNumber, selector);

  return (
    <div className={classes.keywordCard} key={props.key}>
      <div className={classes.title}>
        {keywordName ? keywordName : "잘못된 키워드 입니다."}
      </div>
      <div className={classes.selector}>{selector}</div>
      <Button
        color={"success"}
        onClick={control.selectHandler}
        disabled={control.selector != null}
      >
        SELECT
      </Button>
      <Button
        color={"warning"}
        onClick={control.dropHandler}
        disabled={control.selector != null}
      >
        DROP
      </Button>
    </div>
  );
};

export default Keyword;
