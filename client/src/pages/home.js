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
        console.log(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `https://recipe-app-dra0.onrender.com/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
    fetchSavedRecipes();
  }, [userID]);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("https://recipe-app-dra0.onrender.com/recipes", {
        recipeID,
        userID,
      });
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Explore Our Recipes</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="col">
            <div className="card shadow-sm">
              <img src={recipe.imageUrl} alt={recipe.name} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{recipe.name}</h5>
                <p className="card-text">{recipe.instructions.substring(0, 100)}...</p>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="text-muted">Cooking Time: {recipe.cookingTime} minutes</p>
                  <button
                    className={`btn ${isRecipeSaved(recipe._id) ? 'btn-success' : 'btn-primary'} ${isRecipeSaved(recipe._id) ? 'disabled' : ''}`}
                    onClick={() => saveRecipe(recipe._id)}
                    disabled={isRecipeSaved(recipe._id)}
                  >
                    {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
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
