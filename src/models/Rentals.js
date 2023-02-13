import joi from "joi";


export const rentalSchema = joi.object({
    customerId: joi.number().integer().strict().required().greater(0),
    gameId: joi.number().integer().strict().required().greater(0),
    daysRented: joi.number().integer().strict().required().greater(0),
});