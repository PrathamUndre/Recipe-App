import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

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
        console.error(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `https://recipe-app-dra0.onrender.com/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRecipes();
    fetchSavedRecipes();
  }, [userID]);

  // ✅ Toggle Save/Unsave Recipe
  const toggleSaveRecipe = async (recipeID) => {
    try {
      const isSaved = savedRecipes.includes(recipeID);

      if (isSaved) {
        // 🔴 UNSAVE: Remove from saved recipes
        const response = await axios.delete(
          `https://recipe-app-dra0.onrender.com/recipes/unsave/${userID}/${recipeID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } else {
        // ✅ SAVE: Add to saved recipes
        const response = await axios.put("https://recipe-app-dra0.onrender.com/recipes", {
          recipeID,
          userID,
        });
        setSavedRecipes(response.data.savedRecipes);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4 text-primary">🍽️ Explore Our Recipes</h1>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="col">
            <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
              <img
                src={recipe.imageUrl}
                alt={recipe.name}
                className="card-img-top"
                style={{ height: "220px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title text-primary">{recipe.name}</h5>
                <p className="card-text text-muted">{recipe.instructions.substring(0, 100)}...</p>
                <p className="small text-secondary">⏳ {recipe.cookingTime} minutes</p>

                <div className="d-flex justify-content-between align-items-center">
                  <button
                    className={`btn ${isRecipeSaved(recipe._id) ? "btn-danger" : "btn-outline-primary"} rounded-pill`}
                    onClick={() => toggleSaveRecipe(recipe._id)}
                  >
                    {isRecipeSaved(recipe._id) ? "❌ Unsave" : "❤️ Save"}
                  </button>
                  <a href={`/recipe/${recipe._id}`} className="btn btn-primary rounded-pill">
                    View
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
