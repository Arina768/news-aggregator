import React from "react";

const SearchBar = ({ onSearch, setSearchQuery, searchQuery }) => {
  return (
    <div className="container">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="input-group-append">
          <button className="btn btn-primary" type="button" onClick={onSearch}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
