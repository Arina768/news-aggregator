import { useEffect, useMemo } from "react";
import useFetch from "../hooks/useFetch";
import { toast } from "react-toastify";

const NYT_API_KEY = "VDiQGcwBrkxmtyH5XNSofGyIHuA41fX6";
const NYT_API_URL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

const useNYTArticles = ({ query, date, category, source, page }) => {
  const payload = {
    "api-key": NYT_API_KEY,
    q: query,
    facet_fields: "source,news_desk",
    facet: "true",
    page,
  };

  if (category) {
    payload.fq = `news_desk:("${category.split(",").join('", "')}")`;
  }
  if (date) {
    payload.begin_date = date;
  }
  if (source) {
    payload.fq = payload.fq ? `${payload.fq} AND source:("${source}")` : `source:("${source}")`;
  }

  const params = new URLSearchParams(payload);
  const url = `${NYT_API_URL}?${params.toString()}`;

  const { data, loading, error, refresh } = useFetch(url);

  const normalized = useMemo(() => {
    let normalizedData = {
      articles: [],
      facets: {
        categories: [],
        sources: [],
      },
    };

    if (data?.response?.docs?.length) {
      normalizedData = {
        facets: {
          categories: data?.response?.facets?.news_desk?.terms
            ? data?.response?.facets?.news_desk?.terms.map((category) => category.term)
            : [],
          sources: data?.response?.facets?.source?.terms
            ? data?.response?.facets?.source?.terms.map((source) => source.term)
            : [],
        },
        articles: data.response.docs.map((item) => {
          return {
            id: item._id,
            title: item.headline.main,
            text: item.snippet,
            link: item.web_url,
          };
        }),
      };
    }

    return normalizedData;
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error("An error occurred while loading articles from NYT");
    }
  }, [error]);

  return { data: normalized, loading, error, refresh };
};

export default useNYTArticles;
