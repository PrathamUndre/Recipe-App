import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Menu, X } from "lucide-react"; // Icons for menu toggle

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/auth");
  };

  // Function to check if a link is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 p-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left: Logo */}
        <Link to="/" className="text-white text-3xl font-extrabold hover:text-indigo-200 transition duration-300">
          RecipeHub
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="text-white md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>

        {/* Center: Navigation Links */}
        <div
          className={`md:flex gap-8 absolute md:static top-16 left-0 w-full bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 md:bg-transparent p-4 md:p-0 transition-transform duration-300 ${
            menuOpen ? "block" : "hidden"
          } md:flex`}
        >
          <Link
            to="/"
            className={`text-white hover:text-yellow-300 transition duration-300 ${
              isActive("/") && "border-b-4 border-yellow-300"
            } text-lg`}
          >
            Home
          </Link>
          <Link
            to="/create-recipe"
            className={`text-white hover:text-yellow-300 transition duration-300 ${
              isActive("/create-recipe") && "border-b-4 border-yellow-300"
            } text-lg`}
          >
            Create Recipe
          </Link>
          <Link
            to="/saved-recipes"
            className={`text-white hover:text-yellow-300 transition duration-300 ${
              isActive("/saved-recipes") && "border-b-4 border-yellow-300"
            } text-lg`}
          >
            Saved Recipes
          </Link>
        </div>

        {/* Right: Auth/Login Button */}
        <div className="hidden md:block">
          {!cookies.access_token ? (
            <Link
              to="/auth"
              className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold text-lg hover:bg-blue-100 transition duration-300"
            >
              Login/Register
            </Link>
          ) : (
            <button
              onClick={logout}
              className="bg-red-500 text-white px-6 py-3 rounded-full font-semibold text-lg hover:bg-red-600 transition duration-300"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
