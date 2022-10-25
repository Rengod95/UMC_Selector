import axios from "axios";
import { checkAuthorization, setJWT } from "./token/setAuthorization";

const REQUESTER = (function () {
  axios.defaults.baseURL = "http://localhost:3001";
  axios.defaults.withCredentials = true;

  const loginRequester = async (userData) => {
    const response = await axios({
      url: "/login",
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
      url: "/register/reg",
      method: "POST",
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
    console.log(data);
    return await axios({
      url: "/register/check",
      method: "POST",
      data: data,
    });
  };

  const keywordSelectRequester = async (_keywordID) => {
    return await axios({
      url: "/main/select",
      method: "PUT",
      data: {
        keywordID: _keywordID,
      },
    });
  };

  const keywordDropRequester = async (_keywordID) => {
    return await axios({
      url: "/main/drop",
      method: "PUT",
      data: {
        keywordID: _keywordID,
      },
    });
  };

  const keywordsRequester = async (pageParam) => {
    return await axios({
      url: "/main?page=" + pageParam,
      method: "GET",
    });
  };

  return {
    loginRequester,
    registerRequester,
    checkExistenceRequester,
    keywordSelectRequester,
    keywordDropRequester,
    keywordsRequester,
  };
})();

export default REQUESTER;
