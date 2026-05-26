import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Don't show navbar on login/register pages
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  const categoriesActive =
    location.pathname === "/categories" ||
    location.pathname.startsWith("/quiz");

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="navbar-logo-icon">Q</span>
          <span className="navbar-logo-text">QuizApp</span>
        </Link>

        <div className="navbar-menu">
          {user ? (
            <>
              <Link
                to="/categories"
                className={`navbar-link ${categoriesActive ? "navbar-link--active" : ""}`}
              >
                Categories
              </Link>
              <div className="navbar-user">
                <span className="navbar-user-name">{user.name}</span>
                <button onClick={handleLogout} className="navbar-logout">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`navbar-link ${location.pathname === "/login" ? "navbar-link--active" : ""}`}
              >
                Login
              </Link>
              <Link to="/register" className="navbar-link navbar-link--primary">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
