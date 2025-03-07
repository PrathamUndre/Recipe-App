import React, { useEffect, useState, useRef } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import { useLocation } from "react-router-dom";
import axios from "axios";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();
  const location = useLocation();  /*  from this add this 3 new* for further change it will delete */
  const selectedRecipeID = location.state?.selectedRecipeID || null;
  const recipeRefs = useRef({});
  
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
  
 // Scroll to the selected recipe when Home.js loads
  useEffect(() => {
    if (selectedRecipeID && recipeRefs.current[selectedRecipeID]) {
      recipeRefs.current[selectedRecipeID].scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [recipes, selectedRecipeID]);
  
  
  // ✅ Simple Save/Unsave function
  const toggleSaveRecipe = async (recipeID) => {
    try {
      const isSaved = savedRecipes.includes(recipeID);

      const response = isSaved
        ? await axios.put("https://recipe-app-dra0.onrender.com/recipes/unsave", {
            recipeID,
            userID,
          })
        : await axios.put("https://recipe-app-dra0.onrender.com/recipes", {
            recipeID,
            userID,
          });

      setSavedRecipes(response.data.savedRecipes); // ✅ Updates UI immediately
    } catch (err) {
      console.error(err);
    }
  };

  return ( 
    <div className="container py-5">
      <h1 className="text-center mb-4 text-primary">🍽️ Explore Our Recipes</h1>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {recipes.map((recipe) => (
          <div key={recipe._id} ref={(el) => (recipeRefs.current[recipe._id] = el)} className="col">
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
                    className={`btn ${savedRecipes.includes(recipe._id) ? "btn-success" : "btn-outline-primary"} rounded-pill`}
                    onClick={() => toggleSaveRecipe(recipe._id)}
                  >
                    {savedRecipes.includes(recipe._id) ? "✅ Saved" : "❤️ Save"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
