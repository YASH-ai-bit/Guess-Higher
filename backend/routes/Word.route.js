import express, { Router } from "express";
import { getWord } from "../controllers/Word.controller.js";

const router = express.Router();

router.get("/:id", getWord);

export default router;
