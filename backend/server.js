import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import wordRoutes from "./routes/Word.route.js";
import userRoutes from "./routes/User.route.js";

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/words", wordRoutes);
app.use("/api/users", userRoutes);

//connect db
mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen([PORT, "https://guess-higher-l868.vercel.app"], () => {
    console.log("Connected to db andListening on port 8080");
  });
});
