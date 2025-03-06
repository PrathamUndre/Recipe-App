import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const CreateRecipe = () => {
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const handleAddIngredient = () => {
    const ingredients = [...recipe.ingredients, ""];
    setRecipe({ ...recipe, ingredients });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "https://mern-recipe-app1-server.onrender.com/recipes",
        { ...recipe },
        {
          headers: { authorization: cookies.access_token },
        }
      );

      alert("Recipe Created Successfully! 🎉");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", background: "#f8f9fa" }}>
      <div className="card shadow-lg p-4" style={{ width: "500px", borderRadius: "12px", background: "white" }}>
        <h2 className="text-center mb-4" style={{ fontWeight: "bold", color: "#333" }}>
          🍽️ Create a Delicious Recipe
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Recipe Name */}
          <div className="form-group mb-3">
            <label htmlFor="name" className="fw-bold">Recipe Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={recipe.name}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter recipe name"
              required
            />
          </div>

          {/* Description */}
          <div className="form-group mb-3">
            <label htmlFor="description" className="fw-bold">Description</label>
            <textarea
              id="description"
              name="description"
              value={recipe.description}
              onChange={handleChange}
              className="form-control"
              rows="3"
              placeholder="Briefly describe your recipe"
              required
            ></textarea>
          </div>

          {/* Ingredients */}
          <div className="form-group mb-3">
            <label htmlFor="ingredients" className="fw-bold">Ingredients</label>
            {recipe.ingredients.map((ingredient, index) => (
              <div key={index} className="d-flex align-items-center mb-2">
                <input
                  type="text"
                  name="ingredients"
                  value={ingredient}
                  onChange={(event) => handleIngredientChange(event, index)}
                  className="form-control me-2"
                  placeholder={`Ingredient ${index + 1}`}
                  required
                />
                {index > 0 && (
                  <button type="button" onClick={() => setRecipe({ ...recipe, ingredients: recipe.ingredients.filter((_, i) => i !== index) })} className="btn btn-outline-danger btn-sm">
                    ❌
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={handleAddIngredient} className="btn btn-outline-primary btn-sm mt-2">
              ➕ Add Ingredient
            </button>
          </div>

          {/* Instructions */}
          <div className="form-group mb-3">
            <label htmlFor="instructions" className="fw-bold">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              value={recipe.instructions}
              onChange={handleChange}
              className="form-control"
              rows="5"
              placeholder="Step-by-step instructions"
              required
            ></textarea>
          </div>

          {/* Image URL */}
          <div className="form-group mb-3">
            <label htmlFor="imageUrl" className="fw-bold">Recipe Image URL</label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={recipe.imageUrl}
              onChange={handleChange}
              className="form-control"
              placeholder="Paste image URL here"
            />
            {recipe.imageUrl && (
              <div className="text-center mt-3">
                <img
                  src={recipe.imageUrl}
                  alt="Preview"
                  className="img-fluid rounded shadow"
                  style={{ maxHeight: "200px" }}
                  onError={() => setRecipe({ ...recipe, imageUrl: "" })} // Remove URL if invalid
                />
              </div>
            )}
          </div>

          {/* Cooking Time */}
          <div className="form-group mb-3">
            <label htmlFor="cookingTime" className="fw-bold">Cooking Time (minutes)</label>
            <input
              type="number"
              id="cookingTime"
              name="cookingTime"
              value={recipe.cookingTime}
              onChange={handleChange}
              className="form-control"
              placeholder="Cooking time in minutes"
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-success w-100 mt-3" style={{ transition: "0.3s" }}>
            🚀 Create Recipe
          </button>
        </form>
      </div>
    </div>
  );
};
