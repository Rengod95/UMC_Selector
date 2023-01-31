import React from "react";
import Button from "@mui/material/Button";
import classes from "./MainPage.module.scss";
import Keyword from "./components/Keyword";
import KeywordContainer from "./components/KeywordContainer";

const MainPage = () => {
  return (
    <div className={classes.mainContainer}>
      <div className={classes.leftSection}>
        <div className={classes.profileContainer}></div>
        <div className={classes.calendarContainer}></div>
      </div>
      <div className={classes.rightSection}>
        <KeywordContainer />
      </div>
    </div>
  );
};

export default MainPage;
