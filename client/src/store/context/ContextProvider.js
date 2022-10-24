import React, { useState } from "react";
import { createContext } from "react";
import REQUESTER from "../../api/requester";
import { setJWT } from "../../api/token/setAuthorization";

const defaultContext = {
  userIsLoggedIn: Boolean,
  currentPage: [],
  loginHandler: (userData) => {},
};

const AuthContext = createContext(defaultContext);

const ContextProvider = (props) => {
  const [userIsLoggedIn, setUserISLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState([]);

  const loginHandler = async (userData) => {
    const response = await REQUESTER.loginRequester(userData);
    await setJWT(response);
    setUserISLoggedIn(true);
  };

  const dynamicContext = {
    userIsLoggedIn,
    currentPage,
    loginHandler,
  };

  return (
    <AuthContext.Provider value={dynamicContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default ContextProvider;
