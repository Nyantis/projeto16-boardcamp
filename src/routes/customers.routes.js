import { Router } from "express";
import { postGame, list } from "../controllers/customers.controllers.js";
import { postGameValidation } from "../middlewares/customers.middlewares.js";

const router = Router()

router.get("/customers", list)
router.post("/customers", postGameValidation, postGame)


export default router