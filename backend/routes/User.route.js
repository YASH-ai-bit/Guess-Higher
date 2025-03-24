import express from "express";
import {
  getUser,
  createUser,
  updateHighScore,
} from "../controllers/User.controller.js";

const router = express.Router();

router.get("/:id", getUser);
router.post("/", createUser);
router.put("/:id", updateHighScore);

export default router;
