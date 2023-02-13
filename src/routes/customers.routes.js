import { Router } from "express";
import { create, list, update } from "../controllers/customers.controllers.js";
import { createCustomerValidation, updateCustomerValidation } from "../middlewares/customers.middlewares.js";
import { idParamSanitization } from "../middlewares/generic.middlewares.js";

const router = Router()

router.get("/customers/:id?", idParamSanitization, list)
router.put("/customers/:id?", idParamSanitization, updateCustomerValidation, update)
router.post("/customers", createCustomerValidation, create)


export default router