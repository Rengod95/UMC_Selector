import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import REQUESTER from "../api/requester";

const useInfinityKeywords = () => {
  return useInfiniteQuery(
    ["keywords"],
    ({ pageParam = 0 }) => {
      const response = REQUESTER.keywordsRequester(pageParam);
      const result = response.data;
      return {
        NextPage: pageParam + 1,
        keywords: result.keywords,
        isLast: result.isLast,
      };
    },
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.isLast) return undefined;
        return lastPage.NextPage;
      },
      cacheTime: 3000,
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: true,
    }
  );
};

export default useInfinityKeywords;
