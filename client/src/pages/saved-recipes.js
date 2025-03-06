import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import { Link } from "react-router-dom";

export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `https://recipe-app-dra0.onrender.com/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipes();
  }, [userID]);

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4 text-primary">Saved Recipes</h1>
      <div className="row">
        {savedRecipes.map((recipe) => (
          <div className="col-md-4 mb-4" key={recipe._id}>
            <div className="card shadow-lg border-light rounded-lg">
              <img
                src={recipe.imageUrl}
                alt={recipe.name}
                className="card-img-top"
                style={{
                  height: "250px",
                  objectFit: "cover",
                  transition: "transform 0.3s ease",
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
              <div className="card-body">
                <h5 className="card-title text-primary">{recipe.name}</h5>
                <p className="card-text">{recipe.description}</p>
                <p className="text-muted">Cooking Time: {recipe.cookingTime} minutes</p>

                {/* Ingredients */}
                <h6 className="mt-2">Ingredients:</h6>
                <ul className="list-group list-group-flush mb-3">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="list-group-item">{ingredient}</li>
                  ))}
                </ul>

                {/* Instructions */}
                <h6 className="mt-2">Instructions:</h6>
                <p>{recipe.instructions}</p>

                <Link
                  to={`/recipe/${recipe._id}`}
                  className="btn btn-primary w-100 mt-2"
                >
                  View Full Recipe
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
