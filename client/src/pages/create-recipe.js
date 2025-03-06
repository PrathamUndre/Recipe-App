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
  const [previewImage, setPreviewImage] = useState(null);

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
    if (recipe.ingredients.length < 20) {
      setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
    } else {
      alert("You can add up to 20 ingredients only.");
    }
  };

  const handleRemoveIngredient = (index) => {
    const ingredients = recipe.ingredients.filter((_, i) => i !== index);
    setRecipe({ ...recipe, ingredients });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setRecipe({ ...recipe, imageUrl: file });
    }
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     await axios.post(
  //       "https://recipe-app-dra0.onrender.com/recipes",
  //       { ...recipe },
  //       {
  //         headers: { authorization: cookies.access_token },
  //       }
  //     );
  //     alert("Recipe Created Successfully!");
  //     navigate("/");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
const handleSubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData();

  formData.append("name", recipe.name);
  formData.append("description", recipe.description);
  formData.append("ingredients", recipe.ingredients.join(",")); // Convert array to comma-separated string
  formData.append("instructions", recipe.instructions);
  formData.append("cookingTime", recipe.cookingTime);
  formData.append("userOwner", recipe.userOwner);

  if (recipe.imageUrl) {
    formData.append("imageUrl", recipe.imageUrl); // Append image file
  }

  try {
    await axios.post("https://recipe-app-dra0.onrender.com/recipes", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: cookies.access_token,
      },
    });

    alert("Recipe Created Successfully!");
    navigate("/");
  } catch (error) {
    console.error("Error creating recipe:", error);
  }
};

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", background: "#f8f9fa" }}>
      <div className="card shadow-lg p-4" style={{ width: "500px", borderRadius: "12px", background: "white" }}>
        <h2 className="text-center mb-4">Create a Delicious Recipe 🍽️</h2>
        <form onSubmit={handleSubmit}>
          {/* Recipe Name */}
          <div className="form-group mb-3">
            <label htmlFor="name">Recipe Name</label>
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
            <label htmlFor="description">Description</label>
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
            <label htmlFor="ingredients">Ingredients</label>
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
                  <button type="button" onClick={() => handleRemoveIngredient(index)} className="btn btn-outline-danger btn-sm">
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
            <label htmlFor="instructions">Instructions</label>
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

          {/* Image Upload */}
          <div className="form-group mb-3">
            <label htmlFor="imageUrl">Upload Recipe Image</label>
            <input type="file" id="imageUrl" name="imageUrl" onChange={handleImageChange} className="form-control" />
            {previewImage && (
              <div className="text-center mt-3">
                <img src={previewImage} alt="Preview" className="img-fluid rounded shadow" style={{ maxHeight: "200px" }} />
              </div>
            )}
          </div>

          {/* Cooking Time */}
          <div className="form-group mb-3">
            <label htmlFor="cookingTime">Cooking Time (minutes)</label>
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
