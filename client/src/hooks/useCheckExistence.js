import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import REQUESTER from "../api/requester";

const useCheckExistence = () => {
  const [hasAlready, setHasAlready] = useState(false);
  const [checkingValue, setCheckingValue] = useState(undefined);

  const { isError, isSuccess, isLoading, error, data } = useQuery(
    ["CheckExistence", checkingValue],
    () => {
      console.log("쿼리문 진입");
      return REQUESTER.checkExistenceRequester(checkingValue);
    },
    {
      enabled: !!checkingValue,
      staleTime: 10000,
      keepPreviousData: true,
    }
  );

  if (isError) {
    console.log(error);
  }
  if (isLoading) {
    console.log("loading");
  }
  if (isSuccess) {
    console.log(data);
    setHasAlready(true);
  }

  return {
    hasAlready,
    setCheckingValue,
  };
};

export default useCheckExistence;
