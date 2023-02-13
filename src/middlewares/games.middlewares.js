import { gameSchema } from "../models/Games.js";
import { checkGameAlreadyExists } from "../repository/games.repository.js";
import schemaValidation from "./generic.middlewares.js";

export async function postGameValidation(req, res, next) {
    const game = req.body;

    {const { code, message } = schemaValidation(gameSchema, game)
    if(code){return res.status(code).send(message)}}

    {const { code, message } = await checkGameAlreadyExists(game.name)
    if(code){return res.status(code).send(message)}}

    next();
  }