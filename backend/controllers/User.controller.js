import User from "../models/User.model.js";
import mongoose from "mongoose";

export const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such user" });
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ error: "no such user" });
  }

  res.status(200).json(user);
};

export const createUser = async (req, res) => {
  const { username } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(401)
        .json({ error: "Username already exists, try another!" });
    }

    const user = await User.create({ username });

    res.status(200).json(user);
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(400).json({ error: "Create a username!" });
  }
};

export const updateHighScore = async (req, res) => {
  const { id } = req.params;
  const {highScore} = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such user" });
  }

  const user = await User.findById(id);
  if (!user) {
    return res.status(400).json({ error: "No such user" });
  }

  if (highScore > user.highScore) {
    user.highScore = highScore;
    await user.save();
    return res.status(200).json({ message: "High score updated!", user });
  }

  res.status(200).json(user);
};
