import axios from "axios";
import GV from "../store/constants/globalVariable";
import { checkAuthorization, setJWT } from "./token/setAuthorization";

const REQUESTER = (function () {
  axios.defaults.baseURL = "http://localhost:3001";
  axios.defaults.withCredentials = true;
  axios.defaults.headers['Access-Control-Allow-Origin'] = '*';

  const loginRequester = async (userData) => {
    const response = await axios({
      url: GV.getLoginENP(),
      method: "POST",
      data: {
        userId: userData.userId,
        password: userData.password,
      },
    });

    setJWT(response);
    return response;
  };

  const registerRequester = async (userData) => {
    const response = await axios({
      url: "/register",
      method: "POST",
      mode: "CORS",
      withCredentials: "true",
      data: {
        name: userData.name,
        nickname: userData.nickname,
        userId: userData.userId,
        password: userData.password,
        partNumber: userData.partNumber,
      },
    });
    setJWT(response);
    return response;
  };

  const checkExistenceRequester = async (data) => {
    return await axios({
      url: "/register",
      method: "GET",
      data: data,
    });
  };

  return {
    loginRequester,
    registerRequester,
    checkExistenceRequester,
  };
})();

export default REQUESTER;
