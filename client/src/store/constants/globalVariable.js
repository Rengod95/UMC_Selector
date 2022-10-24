export const GV = function () {
  const URL = process.env.REACT_APP_API_ENDPOINT;

  const ENDPOINTS = {
    register: "/register",
    login: "/login",
    main: "/main",
  };

  const withENDS = {
    main_select: "/select",
    main_drop: "/drop",
  };

  return {
    getURL: () => URL,
    getWithENDS: () => withENDS,
    getRegisterENP: () => ENDPOINTS.register,
    getLoginENP: () => ENDPOINTS.login,
  };
};

export default GV;
