import axios from "axios";

import React from "react";

export const checkAuthorization = () => {
  const jwt = localStorage.getItem("JWT");
  if (jwt) {
    axios.defaults.headers.common["Authorization"] = jwt;
    console.log("토큰 확인 됨");
    return true;
  }
  delete axios.defaults.headers.common["Authorization"];
  return false;
};

export const setJWT = (fetchedData) => {
  const jwt = fetchedData.data.token;
  localStorage.setItem("JWT", jwt);
};
