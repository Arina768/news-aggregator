import React, { useState } from "react";
import ArticleList from "../components/ArticleList";
import SearchBar from "../components/SearchBar";
import Spinner from "react-bootstrap/Spinner";
import useArticlesFeed from "../api/useArticlesFeed";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const [filterDate, setFilterDate] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterSource, setFilterSource] = useState("");

  const {
    data: { articles, categories, sources },
    loading,
    error,
    loadMore,
  } = useArticlesFeed({
    query: searchQuery,
    date: filterDate,
    category: filterCategory,
    source: filterSource,
  });

  const handleSearch = () => {
    setSearchQuery(searchInput);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Search for Articles</h1>

      <div className="mb-3 row">
        <SearchBar onSearch={handleSearch} searchQuery={searchInput} setSearchQuery={setSearchInput} />
      </div>

      <div className="row">
        <div className="col-md-4 mb-3">
          <label htmlFor="filterDate">Filter by Date:</label>
          <input
            type="date"
            id="filterDate"
            className="form-control"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            max={new Date().toISOString().split("T")[0]}
          />
        </div>
        <div className="col-md-4 mb-3">
          <div>
            <label htmlFor="filterCategory">Filter by Category:</label>
            <select
              id="filterCategory"
              className="form-control"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">All</option>
              {categories &&
                !!categories.length &&
                categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <label htmlFor="filterSource">Filter by Source:</label>
          <select
            id="filterSource"
            className="form-control"
            value={filterSource}
            onChange={(e) => setFilterSource(e.target.value)}
          >
            <option value="">All</option>
            {sources &&
              !!sources.length &&
              sources.map((source) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
          </select>
        </div>
      </div>
      {loading && (
        <div className="overlay">
          <Spinner animation="border" role="status" className="spinner" />
        </div>
      )}
      {articles && !!articles.length && (
        <ArticleList
          articles={articles}
          fetchMoreArticles={loadMore}
          handleRetry={() => loadMore(true)}
          error={error}
        />
      )}
    </div>
  );
};

export default SearchPage;
