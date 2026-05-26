import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Categories.css";

const baseCategories = [
  {
    name: "html",
    label: "HTML",
    description: "Basic web page structure",
    icon: "</>",
    theme: "html",
  },
  {
    name: "css",
    label: "CSS",
    description: "Styling and layouts",
    icon: "{}",
    theme: "css",
  },
  {
    name: "javascript",
    label: "JavaScript",
    description: "Interactive programming",
    icon: "JS",
    theme: "javascript",
  },
];

const UserCategories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState(
    baseCategories.map((category) => ({ ...category, count: 0 })),
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCategoryCounts = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get(
          "http://localhost:7000/api/quiz/list/all",
        );
        const counts = response.data.reduce((acc, question) => {
          acc[question.category] = (acc[question.category] || 0) + 1;
          return acc;
        }, {});

        setCategories(
          baseCategories.map((category) => ({
            ...category,
            count: counts[category.name] || 0,
          })),
        );
      } catch (err) {
        setError(
          "Unable to load live category data. Showing default categories.",
        );
        setCategories(
          baseCategories.map((category) => ({ ...category, count: 0 })),
        );
      } finally {
        setLoading(false);
      }
    };

    loadCategoryCounts();
  }, []);

  const handleCategoryClick = (category, count) => {
    if (!count) return;
    navigate(`/quiz/${category}`);
  };

  return (
    <div className="categories-page simple">
      <div className="categories-header">
        <div>
          <h1 className="categories-title">Choose a Quiz Topic</h1>
          <p className="categories-subtitle">
            Select a subject to start learning
          </p>
        </div>
      </div>

      {loading && <div className="categories-loading">Loading categories…</div>}
      {error && <div className="categories-error">{error}</div>}

      <div className="categories-grid simple">
        {categories.map((category) => (
          <div
            key={category.name}
            className={`category-card simple ${category.theme} ${category.count === 0 ? "category-card--disabled" : ""}`}
            onClick={() => handleCategoryClick(category.name, category.count)}
            role="button"
            tabIndex={0}
          >
            <div className="category-icon-wrapper simple">
              <span
                className={`category-icon ${category.name === "javascript" ? "js-icon" : ""}`}
              >
                {category.icon}
              </span>
            </div>
            <div className="category-content">
              <h3>{category.label}</h3>
              <p>{category.description}</p>
              <span className="category-badge">
                {category.count > 0
                  ? `${category.count} Questions`
                  : "Coming soon"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserCategories;
