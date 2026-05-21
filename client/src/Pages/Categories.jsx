import "./Categories.css";

const Categories = () => {
  return (
    <div className="categories-page">
      <div className="categories-header">
        <div>
          <h1 className="categories-title">Quiz Categories</h1>
          <p className="categories-subtitle">Choose a topic to test your knowledge</p>
        </div>
      </div>
      
      <div className="categories-grid">
        {/* HTML Card */}
        <div className="category-card html">
          <div className="category-icon-wrapper">
            <span className="category-icon html-icon">{"</>"}</span>
          </div>
          <div className="category-content">
            <h3>HTML</h3>
            <p>Test your HTML fundamentals</p>
            <span className="category-badge">10 Questions</span>
          </div>
        </div>

        {/* CSS Card */}
        <div className="category-card css">
          <div className="category-icon-wrapper">
            <span className="category-icon css-icon">{"{}"}</span>
          </div>
          <div className="category-content">
            <h3>CSS</h3>
            <p>Master styling and layouts</p>
            <span className="category-badge">10 Questions</span>
          </div>
        </div>

        {/* JS Card */}
        <div className="category-card javascript">
          <div className="category-icon-wrapper">
            <span className="category-icon js-icon">JS</span>
          </div>
          <div className="category-content">
            <h3>JavaScript</h3>
            <p>Challenge your JS skills</p>
            <span className="category-badge">10 Questions</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
