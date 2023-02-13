import { listGames, createGame } from "../repository/games.repository.js";

export async function list(req, res){
    const { code, message } = await listGames()
    res.status(code).send(message)
}

export async function create(req, res){
    const { code, message } = await createGame(req.body)
    res.status(code).send(message)
}