import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import REQUESTER from "../api/requester";
import { useNavigate, useNavigation } from "react-router-dom";

const useRegister = () => {
  const navigator = useNavigate();
  const mutation = useMutation((userData) =>
    REQUESTER.registerRequester(userData)
  );
  if (mutation.isLoading) {
    console.log("Registering");
  }
  if (mutation.isError) {
    console.log("레지스터 에러 발생");
  }
  if (mutation.isSuccess) {
    console.log("register is success");
    navigator("/main");
  }

  return mutation;
};

export default useRegister;
