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
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "https://recipe-app-2-ysik.onrender.com/recipes",
        { ...recipe },
        {
          headers: { authorization: cookies.access_token },
        }
      );

      alert("🎉 Recipe Created Successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg border-0 rounded-4 p-4" style={{ maxWidth: "600px", width: "100%" }}>
        <h2 className="text-center text-success fw-bold mb-3">🍽️ Create a New Recipe</h2>
        <form onSubmit={handleSubmit}>

          {/* Recipe Name */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label fw-semibold">Recipe Name</label>
            <input
              type="text"
              className="form-control rounded-3"
              id="name"
              name="name"
              value={recipe.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label htmlFor="description" className="form-label fw-semibold">Description</label>
            <textarea
              className="form-control rounded-3"
              id="description"
              name="description"
              value={recipe.description}
              onChange={handleChange}
              rows="3"
              required
            ></textarea>
          </div>

          {/* Ingredients */}
          <div className="mb-3">
            <label htmlFor="ingredients" className="form-label fw-semibold">Ingredients</label>
            {recipe.ingredients.map((ingredient, index) => (
              <input
                key={index}
                type="text"
                className="form-control rounded-3 mb-2"
                value={ingredient}
                onChange={(event) => handleIngredientChange(event, index)}
                required
              />
            ))}
            <button type="button" className="btn btn-outline-success w-100 mt-2" onClick={handleAddIngredient}>
              ➕ Add Ingredient
            </button>
          </div>

          {/* Instructions */}
          <div className="mb-3">
            <label htmlFor="instructions" className="form-label fw-semibold">Instructions</label>
            <textarea
              className="form-control rounded-3"
              id="instructions"
              name="instructions"
              value={recipe.instructions}
              onChange={handleChange}
              rows="4"
              required
            ></textarea>
          </div>

          {/* Image URL */}
          <div className="mb-3">
            <label htmlFor="imageUrl" className="form-label fw-semibold">Image URL</label>
            <input
              type="text"
              className="form-control rounded-3"
              id="imageUrl"
              name="imageUrl"
              value={recipe.imageUrl}
              onChange={handleChange}
              required
            />
          </div>

          {/* Cooking Time */}
          <div className="mb-3">
            <label htmlFor="cookingTime" className="form-label fw-semibold">Cooking Time (minutes)</label>
            <input
              type="number"
              className="form-control rounded-3"
              id="cookingTime"
              name="cookingTime"
              value={recipe.cookingTime}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-success w-100 fw-bold">
            ✅ Create Recipe
          </button>

        </form>
      </div>
    </div>
  );
};
