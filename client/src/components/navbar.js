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
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        {/* Left: Logo / App Name */}
        <Link to="/" className="navbar-brand">
          RecipeHub
        </Link>
        {/* Toggle Button for Mobile */}
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
          <ul className="navbar-nav ms-auto">
            {/* Home Link */}
            <li className="nav-item">
              <Link to="/" className="nav-link text-white">
                Home
              </Link>
            </li>
            {/* Create Recipe Link */}
            <li className="nav-item">
              <Link to="/create-recipe" className="nav-link text-white">
                Create Recipe
              </Link>
            </li>
            {/* Saved Recipes Link */}
            <li className="nav-item">
              <Link to="/saved-recipes" className="nav-link text-white">
                Saved Recipes
              </Link>
            </li>

            {/* Conditional Login/Register or Logout Button */}
            <li className="nav-item">
              {!cookies.access_token ? (
                <Link
                  to="/auth"
                  className="btn btn-outline-light ms-3"
                >
                  Login/Register
                </Link>
              ) : (
                <button
                  onClick={logout}
                  className="btn btn-danger ms-3"
                >
                  Logout
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
