import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    if (url) {
      try {
        setLoading(true);
        setError(false);
        const response = await fetch(url);
        if (response.ok) {
          const responseData = await response.json();

          setData(responseData);
        }
        if (response.status === 429) {
          setError(true);
        }
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setError(true);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error, refresh: fetchData };
};

export default useFetch;
