import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import wordRoutes from "./routes/Word.route.js";
import userRoutes from "./routes/User.route.js";
import cors from "cors";

dotenv.config();
const BASE_URL = process.env.BASE_URL;

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use(
  cors({
    origin: ["http://localhost:300-", "https://guess-higher-2rru.vercel.app"],
  })
);

//routes
app.use("/api/words", wordRoutes);
app.use("/api/users", userRoutes);

//connect db
mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(8080, () => {
    console.log("Connected to db andListening on port 8080");
  });
});
