// import React, { useEffect, useState } from "react";
// import { useGetUserID } from "../hooks/useGetUserID";
// import axios from "axios";
// import { Link } from "react-router-dom";


// export const SavedRecipes = () => {
//   const [savedRecipes, setSavedRecipes] = useState([]);
//   const userID = useGetUserID();

//   useEffect(() => {
//     const fetchSavedRecipes = async () => {
//       try {
//         const response = await axios.get(
//           `https://recipe-app-dra0.onrender.com/recipes/savedRecipes/${userID}`
//         );
//         setSavedRecipes(response.data.savedRecipes);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchSavedRecipes();
//   }, [userID]);

//   return (
//     <div className="container my-5">
//       <h1 className="text-center mb-4 text-success fw-bold">
//         🍽️ Your Saved Recipes
//       </h1>

//       {savedRecipes.length === 0 ? (
//         <p className="text-center text-muted">No saved recipes yet. Start exploring!</p>
//       ) : (
//         <div className="row">
//           {savedRecipes.map((recipe) => (
//             <div className="col-md-4 mb-4" key={recipe._id}>
//               <div className="card recipe-card shadow border-0 rounded-4">
//                 <img
//                   src={recipe.imageUrl}
//                   alt={recipe.name}
//                   className="card-img-top"
//                 />
//                 <div className="card-body">
//                   <h5 className="card-title text-success fw-bold">{recipe.name}</h5>
//                   <p className="card-text text-muted">{recipe.description}</p>
//                   <p className="text-muted">
//                     ⏳ Cooking Time: <strong>{recipe.cookingTime} mins</strong>
//                   </p>

//                   {/* Ingredients */}
//                   <h6 className="mt-3 fw-bold">🥦 Ingredients:</h6>
//                   <ul className="list-group list-group-flush mb-3">
//                     {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
//                       <li key={index} className="list-group-item small">
//                         {ingredient}
//                       </li>
//                     ))}
//                   </ul>

//                   <Link
//                     to={`/recipe/${recipe._id}`}
//                     className="btn btn-success w-100 fw-bold"
//                   >
//                     View Full Recipe
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };
import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();
  const navigate = useNavigate();

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

  // ✅ Function to Navigate to Home.js with Selected Recipe
  const goToRecipeInHome = (recipeID) => {
    navigate("/", { state: { selectedRecipeID: recipeID } });
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4 text-success fw-bold">
        🍽️ Your Saved Recipes
      </h1>

      {savedRecipes.length === 0 ? (
        <p className="text-center text-muted">
          No saved recipes yet. Start exploring!
        </p>
      ) : (
        <div className="row">
          {savedRecipes.map((recipe) => (
            <div className="col-md-4 mb-4" key={recipe._id}>
              <div className="card recipe-card shadow border-0 rounded-4">
                <img
                  src={recipe.imageUrl}
                  alt={recipe.name}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title text-success fw-bold">{recipe.name}</h5>
                  <p className="card-text text-muted">{recipe.description}</p>
                  <p className="text-muted">
                    ⏳ Cooking Time: <strong>{recipe.cookingTime} mins</strong>
                  </p>

                  {/* Ingredients */}
                  <h6 className="mt-3 fw-bold">🥦 Ingredients:</h6>
                  <ul className="list-group list-group-flush mb-3">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="list-group-item small">
                        {ingredient}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => goToRecipeInHome(recipe._id)}
                    className="btn btn-success w-100 fw-bold"
                  >
                    View Full Recipe
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

