import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/auth");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm py-2">
      <div className="container">
        {/* Brand Logo / App Name */}
        <Link to="/" className="navbar-brand fw-bold d-flex align-items-center">
          <img
            src="https://img.icons8.com/ios/50/ffffff/chef-hat.png"
            alt="logo"
            className="me-2"
            style={{ width: "35px" }}
          />
          RecipeHub
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto text-center">
            <li className="nav-item">
              <Link to="/" className="nav-link" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">
                🏠 Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/create-recipe" className="nav-link" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">
                📝 Create Recipe
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/saved-recipes" className="nav-link" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">
                ❤️ Saved Recipes
              </Link>
            </li>

            {/* Conditional Login/Register or Logout Button */}
            <li className="nav-item mt-2 mt-lg-0">
              {!cookies.access_token ? (
                <Link
                  to="/auth"
                  className="btn btn-outline-light fw-bold px-4 w-100 w-lg-auto"
                  data-bs-toggle="collapse"
                  data-bs-target=".navbar-collapse.show"
                >
                  🔑 Login
                </Link>
              ) : (
                <button
                  onClick={logout}
                  className="btn btn-danger fw-bold px-4 w-100 w-lg-auto"
                  data-bs-toggle="collapse"
                  data-bs-target=".navbar-collapse.show"
                >
                  🚪 Logout
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
