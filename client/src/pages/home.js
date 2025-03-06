import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // Icons for Save/Unsave

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("https://recipe-app-dra0.onrender.com/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.error("Error fetching recipes:", err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `https://recipe-app-dra0.onrender.com/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes || []);
      } catch (err) {
        console.error("Error fetching saved recipes:", err);
      }
    };

    fetchRecipes();
    if (userID) fetchSavedRecipes();
  }, [userID]);

  // Toggle Save/Unsave Recipe
  const toggleSaveRecipe = async (recipeID) => {
    try {
      const isSaved = savedRecipes.includes(recipeID);

      const response = await axios.put("https://recipe-app-dra0.onrender.com/recipes/toggle-save", {
        recipeID,
        userID,
      });

      // Update state immediately for a smooth UI experience
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.error("Error toggling save recipe:", err);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="text-center text-success fw-bold mb-4">🍽️ Explore Delicious Recipes</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {recipes.map((recipe) => {
          const isSaved = savedRecipes.includes(recipe._id);

          return (
            <div key={recipe._id} className="col">
              <div className="card shadow-lg border-0 rounded-4 h-100 position-relative overflow-hidden">
                <img
                  src={recipe.imageUrl}
                  alt={recipe.name}
                  className="card-img-top rounded-top"
                  style={{
                    height: "220px",
                    objectFit: "cover",
                    transition: "transform 0.3s ease-in-out",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />

                {/* Save/Unsave Button (Heart Icon) */}
                <button
                  className="btn btn-light shadow-sm position-absolute top-0 end-0 m-2 rounded-circle"
                  style={{ zIndex: 10 }}
                  onClick={() => toggleSaveRecipe(recipe._id)}
                >
                  {isSaved ? <FaHeart className="text-danger" size={20} /> : <FaRegHeart size={20} />}
                </button>

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-primary fw-semibold">{recipe.name}</h5>
                  <p className="card-text flex-grow-1">
                    {recipe.instructions.length > 100
                      ? `${recipe.instructions.substring(0, 100)}...`
                      : recipe.instructions}
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="text-muted mb-0">⏳ {recipe.cookingTime} min</p>
                    <button
                      className={`btn ${isSaved ? "btn-danger" : "btn-outline-primary"} rounded-3`}
                      onClick={() => toggleSaveRecipe(recipe._id)}
                    >
                      {isSaved ? "❌ Unsave" : "💾 Save"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
