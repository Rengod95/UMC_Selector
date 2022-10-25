import React, { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import REQUESTER from "../api/requester";
import { useNavigate } from "react-router-dom";

const useRegister = () => {
  const navigator = useNavigate();
  const mutation = useMutation((userData) =>
    REQUESTER.registerRequester(userData)
  );

  const trigger = (val) => mutation.mutate(val);

  if (mutation.isLoading) {
    console.log("Registering");
  }
  if (mutation.isError) {
    console.log("레지스터 에러 발생");
  }

  useEffect(() => {
    if (mutation.isSuccess) {
      console.log(mutation.data);
      navigator("/main");
    }
  }, [mutation.isSuccess, navigator]);

  return trigger;
};

export default useRegister;
