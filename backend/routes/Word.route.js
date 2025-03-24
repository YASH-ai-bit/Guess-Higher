import express, { Router } from "express";
import { getWords} from "../controllers/Word.controller.js";

const router = express.Router();

router.get("/:id?", getWords);

export default router;
