import { getAllGames, postGameQuery } from "../repository/games.repository.js";

export async function list(req, res){
    const games = await getAllGames()
    res.status(games.code).send(games.message)
}

export async function create(req, res){
    const answer = await postGameQuery(req.body)
    return res.status(answer.code).send(answer.message)
}