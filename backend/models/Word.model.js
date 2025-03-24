import mongoose from "mongoose";

const Schema = mongoose.Schema;

const wordSchema = new Schema(
  {
    word: {
      type: String,
      required: true,
    },
    searchCount: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Word = mongoose.model("Word", wordSchema);

export default Word;
