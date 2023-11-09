import { useEffect, useMemo } from "react";
import useFetch from "../hooks/useFetch";
import { toast } from "react-toastify";

const NEWS_API_KEY = "29c68af36e9a4cb79617a9917a28e3c7";
const NEWS_API_URL = "https://newsapi.org/v2/everything";

const useNewsApiArticles = ({ query, date, source, page }) => {
  const payload = {
    apiKey: NEWS_API_KEY,
    q: query,
    page,
  };

  if (date) {
    payload.from = date;
  }
  if (source) {
    payload.sources = source;
  }

  const params = new URLSearchParams(payload);
  const url = query ? `${NEWS_API_URL}?${params.toString()}` : "";

  const { data, loading, error, refresh } = useFetch(url);

  const normalized = useMemo(() => {
    const normalizedData = {
      articles: [],
      facets: {
        categories: [],
        sources: [],
      },
    };

    if (data?.articles?.length) {
      normalizedData.articles = data.articles.map((item) => {
        return {
          id: item.author + item.publishedAt,
          title: item.title,
          text: item.description,
          link: item.url,
        };
      });
    }

    return normalizedData;
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error("An error occurred while loading articles from NewsAPI");
    }
  }, [error]);

  return { data: normalized, loading, error, refresh };
};

export default useNewsApiArticles;
