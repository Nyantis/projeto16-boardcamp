import { gameSchema } from "../models/Games.js";
import { checkGameAlreadyExists } from "../repository/games.repository.js";
import schemaValidation from "./schemaValidation.js";

export async function postGameValidation(req, res, next) {
    const user = req.body;

    const errors = await schemaValidation(gameSchema, user)
    if(errors){
        return res.status(400).send(errors);
    }

    const gameExists = await checkGameAlreadyExists(req.body.name)
    if(gameExists.code !== 0){
        return res.status(gameExists.code).send(gameExists.message);
    }

    next();
  }