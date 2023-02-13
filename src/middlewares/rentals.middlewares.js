import { rentalSchema } from "../models/Rentals.js";
import { checkGameAvailable, checkIDsExistence } from "../repository/rentals.repository.js";
import schemaValidation from "./generic.middlewares.js";

export async function createRentalValidation(req, res, next) {
    const rental = req.body
    const { customerId, gameId, } = rental;

    {const { code, message } = schemaValidation(rentalSchema, rental)
    if(code){return res.status(code).send(message)}}

    {const { code, message, info } = await checkIDsExistence(customerId, gameId)
    if(code){return res.status(code).send(message)}
    res.locals.pricePerDay = info.pricePerDay
    }

    {const { code, message } = await checkGameAvailable(gameId)
    if(code){return res.status(code).send(message)}
    }

    next();
}

export async function finishRentalValidation(req, res, next) {
    const rental = req.body;
    const { id } = res.locals

    {const { code, message } = schemaValidation(rentalSchema, rental)
    if(code){return res.status(code).send(message)}}

    // {const { code, message } = await checkCustomerCpf(customer.cpf, id)
    // if(code){return res.status(code).send(message)}}

    next();
}