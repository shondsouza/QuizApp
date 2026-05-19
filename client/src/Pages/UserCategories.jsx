import { useNavigate } from "react-router-dom";
import "./Categories.css"; // Reuse the admin Categories.css

const UserCategories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/quiz/${category}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="categories-page" style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto", boxSizing: "border-box" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <h1 className="categories-title" style={{ marginBottom: 0 }}>Select a Language</h1>
        <button 
          onClick={handleLogout}
          style={{
            padding: "8px 16px",
            backgroundColor: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "600"
          }}
        >
          Logout
        </button>
      </div>
      
      <div className="categories-grid">
        {/* HTML Card */}
        <div className="category-card" onClick={() => handleCategoryClick("html")}>
          <div className="category-icon-wrapper">
            <span className="category-icon html-icon">{"</>"}</span>
          </div>
          <div className="category-content">
            <h3>HTML</h3>
            <p>Click to start quiz</p>
          </div>
        </div>

        {/* CSS Card */}
        <div className="category-card" onClick={() => handleCategoryClick("css")}>
          <div className="category-icon-wrapper">
            <span className="category-icon css-icon">{"{}"}</span>
          </div>
          <div className="category-content">
            <h3>CSS</h3>
            <p>Click to start quiz</p>
          </div>
        </div>

        {/* JS Card */}
        <div className="category-card" onClick={() => handleCategoryClick("javascript")}>
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

export default UserCategories;
