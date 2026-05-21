import { useNavigate } from "react-router-dom";
import "./Categories.css";

const UserCategories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/quiz/${category}`);
  };

  return (
    <div className="categories-page simple">
      <div className="categories-header">
        <div>
          <h1 className="categories-title">Choose a Quiz Topic</h1>
          <p className="categories-subtitle">Select a subject to start learning</p>
        </div>
      </div>
      
      <div className="categories-grid simple">
        {/* HTML Card */}
        <div className="category-card simple html" onClick={() => handleCategoryClick("html")}>
          <div className="category-icon-wrapper simple">
            <span className="category-icon html-icon">{"</>"}</span>
          </div>
          <div className="category-content">
            <h3>HTML</h3>
            <p>Basic web page structure</p>
          </div>
        </div>

        {/* CSS Card */}
        <div className="category-card simple css" onClick={() => handleCategoryClick("css")}>
          <div className="category-icon-wrapper simple">
            <span className="category-icon css-icon">{"{}"}</span>
          </div>
          <div className="category-content">
            <h3>CSS</h3>
            <p>Styling and layouts</p>
          </div>
        </div>

        {/* JS Card */}
        <div className="category-card simple javascript" onClick={() => handleCategoryClick("javascript")}>
          <div className="category-icon-wrapper simple">
            <span className="category-icon js-icon">JS</span>
          </div>
          <div className="category-content">
            <h3>JavaScript</h3>
            <p>Interactive programming</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCategories;
