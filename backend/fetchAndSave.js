import mongoose from "mongoose";
import { getJson } from "serpapi"; //using SerpApi for collecting data for images and searchCounts
import dotenv from "dotenv";
import Word from "./models/Word.model.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const SERP_API = process.env.SERP_API;

mongoose.connect(process.env.MONGO_URI);

const words = [
  "OnlyFans",
  "Etsy",
  "Walgreens",
  "Pizza",
  "Starbucks",
  "McDonald’s",
  "Bitcoin",
  "Apple",
  "Chipotle",
  "Sarkari Result",
  "IPL",
  "Proxy",
  "Real Madrid",
  "Indeed",
  "duckduckgo",
  "Airbnb",
  "Diddy",
  "Breaking Bad",
  "APT",
  "House of the Dragon",
  "Dune",
  "Connections",
  "Mango Pickle",
  "Wallerman",
  "Liam Payne",
  "Ratan Tata",
  "CrowdStrike",
  "Mike Tyson",
  "Israel",
  "Dress",
  "Hurricane",
  "Beauty",
];

async function fetchAndSaveCountsForAWord(word) {
  return new Promise((resolve, reject) => {
    getJson(
      {
        engine: "google",
        q: word,
        api_key: SERP_API,
      },
      async (json) => {
        try {
          const searchCount = json?.search_information?.total_results;

          if (searchCount !== undefined) {
            console.log(`Saving search counts for ${word} --> ${searchCount}`);
            resolve(searchCount);
          } else {
            console.log(`Failed to fetch searchCounts for "${word}"`);
            reject();
          }
        } catch (error) {
          console.log(
            `Error saving the search counts for "${word}"`,
            error.message
          );
          reject(error);
        }
      }
    );
  });
}

async function fetchAndSaveImageForAWord(word) {
  return new Promise((resolve, reject) => {
    getJson(
      {
        engine: "google_images",
        q: word,
        location: "Austin, TX, Texas, United States",
        api_key: SERP_API,
      },
      async (json) => {
        try {
          const imageUrl = json?.images_results[0]?.original;

          if (imageUrl !== undefined) {
            console.log(`Saving image url for ${word} --> ${imageUrl}`);
            resolve(imageUrl);
          } else {
            console.log(`Failed to fetch image url for "${word}"`);
            reject();
          }
        } catch (error) {
          console.log(
            `Error saving the image url for "${word}"`,
            error.message
          );
          reject(error);
        }
      }
    );
  });
}

async function collectionOfDataInMongoDB() {
  for (var i = 0; i < words.length; i++) {
    try {
      const [searchCount, imageUrl] = await Promise.all([
        fetchAndSaveCountsForAWord(words[i]),
        fetchAndSaveImageForAWord(words[i]),
      ]);
      console.log(
        `Saving data for ${words[i]} --> ${searchCount}  ,  ${imageUrl}`
      );
      const newWord = new Word({ word: words[i], searchCount, imageUrl });
      await newWord.save();
    } catch (error) {
      console.log(`Data error for ${words[i]}, so skipping it.`);
    }
  }
  console.log("data saved!!!");
  mongoose.connection.close();
}

collectionOfDataInMongoDB();
