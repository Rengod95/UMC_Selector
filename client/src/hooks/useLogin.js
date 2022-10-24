import React from "react";
import { useMutation } from "@tanstack/react-query";
import REQUESTER from "../api/requester";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const navigator = useNavigate();
  const mutation = useMutation((user) => REQUESTER.loginRequester(user));

  if (mutation.isError) {
    console.log(mutation.error);
  }
  if (mutation.isLoading) {
    console.log("Logging in");
  }
  if (mutation.isSuccess) {
    console.log("login success");
    navigator("/main");
  }

  return mutation;
};

export default useLogin;
