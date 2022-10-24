import React, { useState } from "react";

const useInput = () => {
  const [value, setValue] = useState("");

  const onChangeHandler = (event) => {
    setValue(event.target.value);
    console.log(event.target.value);
  };

  const resetInputValue = () => {
    setValue("");
  };

  return {
    value,
    onChangeHandler,
    resetInputValue,
  };
};

export default useInput;
