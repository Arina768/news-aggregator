import React, { useState, useEffect } from "react";
import categoriesData from "../categories.json";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import useSources from "../api/useSources";

const NewsFeedPreferences = (props) => {
  const { selectedCategories, selectedSources, setSelectedCategories, setSelectedSources } = props;
  const [categories, setCategories] = useState([]);

  const { sources } = useSources();

  useEffect(() => {
    const savedCategories = JSON.parse(localStorage.getItem("selectedCategories"));
    const savedSources = JSON.parse(localStorage.getItem("selectedSources"));

    if (savedCategories) {
      setSelectedCategories(savedCategories);
    }

    if (savedSources) {
      setSelectedSources(savedSources);
    }
    setCategories(categoriesData.categories);
  }, []);

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    let newCategoriesList = [];
    if (selectedCategories.includes(value)) {
      newCategoriesList = selectedCategories.filter((category) => category !== value);
    } else {
      newCategoriesList = [...selectedCategories, value];
    }
    setSelectedCategories(newCategoriesList);
    localStorage.setItem("selectedCategories", JSON.stringify(newCategoriesList));
  };

  const handleSourceChange = (event) => {
    const value = event.target.value;
    let newSourceList = [];
    if (selectedSources.includes(value)) {
      newSourceList = selectedSources.filter((source) => source !== value);
    } else {
      newSourceList = [...selectedSources, value];
    }
    setSelectedSources(newSourceList);
    localStorage.setItem("selectedSources", JSON.stringify(newSourceList));
  };

  return (
    <div className="mt-4">
      <div className="row">
        <div className="col-md-6 mb-3">
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="category-dropdown" disabled={!categories.length}>
              Select Categories
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {categories.map((category) => (
                <Form.Check
                  key={category}
                  type="checkbox"
                  label={category}
                  value={category}
                  checked={selectedCategories.includes(category)}
                  onChange={handleCategoryChange}
                />
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="col-md-6">
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="source-dropdown" disabled={!sources.length}>
              Select Sources
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {sources.map((source) => (
                <Form.Check
                  key={source}
                  type="checkbox"
                  label={source}
                  value={source}
                  checked={selectedSources.includes(source)}
                  onChange={handleSourceChange}
                />
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default NewsFeedPreferences;
