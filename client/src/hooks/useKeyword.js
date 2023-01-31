import React, { useState } from "react";
import REQUESTER from "../api/requester";

const useKeyword = (_keywordNumber, _selector) => {
  const [selector, setSelector] = useState(_selector);

  const selectHandler = () => {
    REQUESTER.keywordSelectRequester(_keywordNumber)
      .then((res) => {
        console.log("선택됨");
        setSelector(res.data.selectedBy);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  const dropHandler = (keywordNumber) => {
    REQUESTER.keywordDropRequester(keywordNumber)
      .then((res) => {
        console.log("드랍됨");
        setSelector(undefined);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  return {
    selectHandler,
    dropHandler,
    selector,
  };
};

export default useKeyword;
