import Word from "../models/Word.model.js";
import mongoose from "mongoose";


export const getWords = async (req, res) => {
  const { id } = req.params;
    // If an ID is provided, fetch a specific word
  try {
    if (id) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such word" });
      }

      const word = await Word.findById(id);

      if (!word) return res.status(404).json({ error: "No such word" });

      return res.status(200).json(word);
    }

    // If no ID is provided, fetch two random words
    const words = await Word.aggregate([{ $sample: { size: 2 } }]);
    if (words.length < 2) {
      return res.status(404).json({ error: "Not enough words in the database" });
    }

    res.status(200).json({ word1: words[0], word2: words[1] });

  } catch (error) {
    console.error("Failed to fetch words:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
