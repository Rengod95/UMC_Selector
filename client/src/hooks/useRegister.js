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
    console.log(mutation.error);
  }
  if (mutation.isSuccess) {
    console.log("register is success", mutation.data);
    navigator("/main");
  }

  return mutation;
};

export default useRegister;
