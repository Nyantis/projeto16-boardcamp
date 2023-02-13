import { Router } from "express";
import { create, list } from "../controllers/customers.controllers.js";
import { createCustomerValidation } from "../middlewares/customers.middlewares.js";
import { idParamSanitization } from "../middlewares/generic.middlewares.js";

const router = Router()

router.get("/customers/:id?", idParamSanitization, list)
router.post("/customers", createCustomerValidation, create)


export default router