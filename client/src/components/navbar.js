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
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left: Logo */}
        <Link to="/" className="text-white text-2xl font-bold">
          RecipeHub
        </Link>

        {/* Center: Navigation Links */}
        <div className="flex gap-6">
          <Link to="/" className="text-white hover:text-gray-200 transition">
            Home
          </Link>
          <Link to="/create-recipe" className="text-white hover:text-gray-200 transition">
            Create Recipe
          </Link>
          <Link to="/saved-recipes" className="text-white hover:text-gray-200 transition">
            Saved Recipes
          </Link>
        </div>

        {/* Right: Auth/Login Button */}
        <div>
          {!cookies.access_token ? (
            <Link
              to="/auth"
              className="bg-white text-blue-600 px-4 py-2 rounded-md font-semibold hover:bg-gray-200 transition"
            >
              Login/Register
            </Link>
          ) : (
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
