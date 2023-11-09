import { useState, useEffect } from "react";
import useNYTArticles from "./useNYTArticles";
import useGuardianArticles from "./useGuardianArticles";
import useNewsApiArticles from "./useNewsApiArticles";

const useArticlesFeed = ({ query, date, category, source }) => {
  const [articles, setArticles] = useState(null);
  const [categories, setCategories] = useState(null);
  const [sources, setSources] = useState(null);
  const [page, setPage] = useState(1);

  const {
    data: NYTData,
    loading: nytLoading,
    error: nytError,
    refresh: nytRefresh,
  } = useNYTArticles({ query, date, category, source, page });
  const {
    data: guardianData,
    loading: guardianLoading,
    error: guardianError,
    refresh: guardianRefresh,
  } = useGuardianArticles({ query, date, category, page });
  const {
    data: newsAPIData,
    loading: newsAPILoading,
    error: newsAPIError,
    refresh: newsAPIRefresh,
  } = useNewsApiArticles({ query, date, source, page });

  useEffect(() => {
    setArticles(null);
    setPage(1);
  }, [query, date, category, source]);

  const loadMore = (retry = false) => {
    if (retry && page !== 1) {
      nytRefresh();
      guardianRefresh();
      newsAPIRefresh();
    } else {
      setPage((prevValue) => prevValue + 1);
    }
  };

  useEffect(() => {
    const articlesList = articles
      ? [...articles, ...NYTData.articles, ...guardianData.articles, ...newsAPIData.articles]
      : [...NYTData.articles, ...guardianData.articles, ...newsAPIData.articles];

    const uniqueItemsMap = new Map();
    const uniqueArticles = articlesList.filter((item) => {
      if (!uniqueItemsMap.has(item.id)) {
        uniqueItemsMap.set(item.id, true);
        return true;
      }
      return false;
    });
    setArticles(uniqueArticles);

    if (page === 1) {
      const allCategories = [...NYTData.facets.categories, ...guardianData.facets.categories];
      setCategories(allCategories.filter((item) => !!item));
      const allSources = [...NYTData.facets.sources, ...guardianData.facets.sources];
      setSources(allSources.filter((item) => !!item));
    }
  }, [NYTData, guardianData]);

  return {
    data: { articles, categories, sources },
    loading: nytLoading && guardianLoading && newsAPILoading,
    error: nytError || guardianError || newsAPIError,
    loadMore,
  };
};

export default useArticlesFeed;
