import { Router } from "express";
import { retrieve } from "../controllers/retrieve.controllers.js";

const router = Router()

router.get("/customer", retrieve)


export default router