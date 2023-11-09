import { useEffect, useMemo } from "react";
import useFetch from "../hooks/useFetch";
import { toast } from "react-toastify";

const GUARDIAN_KEY = "d33c99cf-1411-498e-9ac3-d31fd35cc3ee";
const GUARDIAN_URL = "https://content.guardianapis.com/search";

const parseHtmlToPlainText = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

const useGuardianArticles = ({ query, date, category, page }) => {
  const payload = {
    "api-key": GUARDIAN_KEY,
    q: query,
    page,
    "show-fields": "trailText,headline",
  };

  if (date) {
    payload["from-date"] = date;
  }
  if (category) {
    payload.section = category;
  }

  const params = new URLSearchParams(payload);
  const url = `${GUARDIAN_URL}?${params.toString()}`;

  const { data, loading, error, refresh } = useFetch(url);

  const normalized = useMemo(() => {
    let normalizedData = {
      articles: [],
      facets: {
        categories: [],
        sources: [],
      },
    };

    if (data?.response?.results?.length) {
      normalizedData.articles = data.response.results.map((item) => {
        return {
          id: item.id,
          title: item.fields.headline,
          text: parseHtmlToPlainText(item.fields.trailText),
          link: item.webUrl,
        };
      });
    }

    return normalizedData;
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error("An error occurred while loading articles from Guardian");
    }
  }, [error]);

  return { data: normalized, loading, error, refresh };
};

export default useGuardianArticles;
