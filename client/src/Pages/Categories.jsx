import "./Categories.css";

const Categories = () => {
  return (
    <div className="categories-page">
      <h1 className="categories-title">Categories</h1>
      
      <div className="categories-grid">
        {/* HTML Card */}
        <div className="category-card">
          <div className="category-icon-wrapper">
            <span className="category-icon html-icon">{"</>"}</span>
          </div>
          <div className="category-content">
            <h3>HTML</h3>
            <p>Click to start quiz</p>
          </div>
        </div>

        {/* CSS Card */}
        <div className="category-card">
          <div className="category-icon-wrapper">
            <span className="category-icon css-icon">{"{}"}</span>
          </div>
          <div className="category-content">
            <h3>CSS</h3>
            <p>Click to start quiz</p>
          </div>
        </div>

        {/* JS Card */}
        <div className="category-card">
          <div className="category-icon-wrapper">
            <span className="category-icon js-icon">JS</span>
          </div>
          <div className="category-content">
            <h3>JAVASCRIPT</h3>
            <p>Click to start quiz</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
