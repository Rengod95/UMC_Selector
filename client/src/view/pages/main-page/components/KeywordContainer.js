import React from "react";
import classes from "./KeywordContainer.module.scss";
import Keyword from "./Keyword";
import useInfinityKeywords from "../../../../hooks/useInfinityKeywords";
import InfiniteScroll from "react-infinite-scroller";

const KeywordContainer = () => {
  const query = useInfinityKeywords();
  if (query.isSuccess) {
    console.log("키워드 불러오기 완료");
    console.log(query.data);
  }

  return (
    <div className={classes.keywordContainer}>
      <InfiniteScroll
        loadMore={query.fetchNextPage}
        hasMore={query.hasNextPage}
      >
        {query.isLoading ? (
          <div>Is Loading</div>
        ) : query.isError ? (
          <div>{query.error.message}</div>
        ) : query.isSuccess ? (
          query.data.pages.map((page) => {
            return page.map((key) => (
              <Keyword
                key={key.keywordNumber}
                keywordName={key.keywordName}
                keywordNumber={key.keywordNumber}
                selector={key.selector}
              />
            ));
          })
        ) : undefined}
        {query.status === "Fetching" ? <div>Fetching keywords</div> : undefined}
      </InfiniteScroll>
    </div>
  );
};

export default KeywordContainer;
