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
    ingredients: [""],
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

  const handleRemoveIngredient = (index) => {
    const ingredients = [...recipe.ingredients];
    ingredients.splice(index, 1);
    setRecipe({ ...recipe, ingredients });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "https://recipe-app-dra0.onrender.com/recipes",
        { ...recipe },
        {
          headers: { authorization: cookies.access_token },
        }
      );
      alert("Recipe Created");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", background: "#f1f1f1" }}>
      <div className="card shadow-lg p-4" style={{ width: "500px", borderRadius: "10px" }}>
        <h2 className="text-center mb-4">Create Recipe</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="name">Recipe Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={recipe.name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={recipe.description}
              onChange={handleChange}
              className="form-control"
              rows="3"
              required
            ></textarea>
          </div>

          <div className="form-group mb-3">
            <label htmlFor="ingredients">Ingredients</label>
            {recipe.ingredients.map((ingredient, index) => (
              <div key={index} className="d-flex align-items-center mb-2">
                <input
                  type="text"
                  name="ingredients"
                  value={ingredient}
                  onChange={(event) => handleIngredientChange(event, index)}
                  className="form-control me-2"
                  required
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveIngredient(index)}
                    className="btn btn-danger btn-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={handleAddIngredient} className="btn btn-outline-primary btn-sm">
              Add Ingredient
            </button>
          </div>

          <div className="form-group mb-3">
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              value={recipe.instructions}
              onChange={handleChange}
              className="form-control"
              rows="5"
              required
            ></textarea>
          </div>

          <div className="form-group mb-3">
            <label htmlFor="imageUrl">Recipe Image</label>
            <input
              type="file"
              id="imageUrl"
              name="imageUrl"
              onChange={(e) => setRecipe({ ...recipe, imageUrl: e.target.files[0] })}
              className="form-control"
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="cookingTime">Cooking Time (minutes)</label>
            <input
              type="number"
              id="cookingTime"
              name="cookingTime"
              value={recipe.cookingTime}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100 mt-3">
            Create Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

