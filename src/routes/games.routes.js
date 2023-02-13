import { Router } from "express";
import { create, list } from "../controllers/games.controllers.js";
import { postGameValidation } from "../middlewares/games.middlewares.js";

const router = Router()

router.get("/games", list)
router.post("/games", postGameValidation, create)


export default router