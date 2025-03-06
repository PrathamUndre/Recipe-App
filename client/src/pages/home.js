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

  const toggleSaveRecipe = async (recipeID) => {
    try {
      const response = await axios.put(
        "https://recipe-app-dra0.onrender.com/recipes/toggleSave",
        { recipeID, userID }
      );
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4 text-primary">Explore Our Recipes</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="col">
            <div className="card shadow-lg border-0 rounded">
              <img
                src={recipe.imageUrl}
                alt={recipe.name}
                className="card-img-top"
                style={{ height: "250px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-primary">{recipe.name}</h5>
                <p className="card-text text-muted">{recipe.instructions.substring(0, 80)}...</p>
                <div className="d-flex justify-content-between align-items-center mt-auto">
                  <p className="text-muted mb-0">
                    <i className="bi bi-clock"></i> {recipe.cookingTime} min
                  </p>
                  <button
                    className={`btn ${isRecipeSaved(recipe._id) ? "btn-danger" : "btn-outline-danger"}`}
                    onClick={() => toggleSaveRecipe(recipe._id)}
                  >
                    <i className={`bi ${isRecipeSaved(recipe._id) ? "bi-heart-fill" : "bi-heart"}`}></i>
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
