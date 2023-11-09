import React, { useState } from "react";
import NewsFeedPreferences from "../components/NewsFeedPreferences";
import ArticleList from "../components/ArticleList";
import Spinner from "react-bootstrap/Spinner";
import useArticlesFeed from "../api/useArticlesFeed";

const PersonalFeed = () => {
  const [selectedCategories, setSelectedCategories] = useState(null);
  const [selectedSources, setSelectedSources] = useState(null);

  const {
    data: { articles },
    loading,
    error,
    loadMore,
  } = useArticlesFeed({
    query: "",
    date: "",
    category: selectedCategories ? selectedCategories.join(",") : "",
    source: selectedSources ? selectedSources.join(",") : "",
  });

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Personalized News Feed</h1>
      <div className="mb-4">
        <NewsFeedPreferences
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          selectedSources={selectedSources}
          setSelectedSources={setSelectedSources}
        />
        {articles && !!articles.length && (
          <ArticleList
            articles={articles}
            fetchMoreArticles={loadMore}
            handleRetry={() => loadMore(true)}
            error={error}
          />
        )}
        {loading && (
          <div className="overlay mt-4">
            <Spinner animation="border" role="status" className="spinner" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalFeed;
