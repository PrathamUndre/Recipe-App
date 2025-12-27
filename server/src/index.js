import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/user.js";
import { recipesRouter } from "./routes/recipes.js";

const app = express();

app.use(express.json());
app.use(cors({
   origin: "https://recipe-app-1-q0q3.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
       );

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

mongoose.connect(
  "mongodb+srv://prathameshundre23:Anna%402304@cluster0.destd.mongodb.net/Recipe_db?appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(
    console.log("DB connected...")
  )

app.listen(3001, () => console.log("Server started"));
