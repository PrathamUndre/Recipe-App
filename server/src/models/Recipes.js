// import mongoose from "mongoose";

// const recipeSchema = mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   ingredients: [
//     {
//       type: String,
//       required: true,
//     },
//   ],
//   instructions: {
//     type: String,
//     required: true,
//   },

//   imageUrl: {
//     type: String,
//     required: true,
//   },
//   cookingTime: {
//     type: Number,
//     required: true,
//   },
//   userOwner: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
// });

// export const RecipesModel = mongoose.model("Recipes", recipeSchema);
import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    ingredients: {
      type: [String], // Ensures an array of strings
      required: true,
      default: [],
    },
    instructions: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (url) {
          return /^https?:\/\/.*\.(jpeg|jpg|png|gif|webp)$/i.test(url);
        },
        message: "Invalid image URL format",
      },
    },
    cookingTime: {
      type: Number,
      required: true,
      min: [1, "Cooking time must be at least 1 minute"],
    },
    userOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true } // Automatically creates createdAt & updatedAt
);

export const RecipesModel = mongoose.model("Recipes", recipeSchema);

