import React, { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import REQUESTER from "../api/requester";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const navigator = useNavigate();
  const mutation = useMutation((user) => REQUESTER.loginRequester(user));

  const trigger = (val) => mutation.mutate(val);

  if (mutation.isError) {
    console.log(mutation.error);
  }
  if (mutation.isLoading) {
    console.log("Logging in");
  }

  useEffect(() => {
    if (mutation.isSuccess) {
      console.log("login success");
      navigator("/main");
    }
  }, [mutation.isSuccess, navigator]);

  return trigger;
};

export default useLogin;
