import { useEffect, useMemo } from "react";
import useFetch from "../hooks/useFetch";
import { toast } from "react-toastify";

const NYT_API_KEY = "VDiQGcwBrkxmtyH5XNSofGyIHuA41fX6";
const NYT_API_URL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

const useSources = () => {
  const queryParams = new URLSearchParams({
    "api-key": NYT_API_KEY,
    facet_fields: "source",
    facet: "true",
  });

  const url = `${NYT_API_URL}?${queryParams.toString()}`;
  const { data, loading, error, refresh } = useFetch(url);

  const normalized = useMemo(() => {
    let normalizedData = [];

    if (data && data.response.facets) {
      const sourceFacet = data.response.facets.source;
      if (sourceFacet && sourceFacet.terms) {
        normalizedData = sourceFacet.terms.map((term) => term.term);
      }
    }

    return normalizedData;
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error("An error occurred while loading sources from NYT");
    }
  }, [error]);

  return { sources: normalized, loading, error, refresh };
};

export default useSources;
