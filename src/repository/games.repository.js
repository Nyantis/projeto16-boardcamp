import { connection } from "../database/db.js";

export async function getAllGames(){
    try{
        const games = await connection.query(`SELECT * FROM games`)
        return {
            code: 200,
            message: games.rows
        }

    }catch(err){
        return {
            code: 500,
            message: err.message
        }
    }
}

export async function checkGameAlreadyExists(name){
    try {
        const game = await connection.query(`SELECT name FROM games WHERE name = $1`, [name])
        return {
            code: game.rowCount > 0 ? 409 : 0,
            message: "This game name already exists"
        }

    } catch (err) {
        return {
            code: 500,
            message: err.message
        }
    }
}

export async function postGameQuery(body){
    try {
        const game = await connection.query(`
            INSERT INTO games (
                name, 
                image, 
                "stockTotal", 
                "pricePerDay"
                ) 
            VALUES ($1, $2, $3, $4)`, 
            [body.name, body.image, body.stockTotal, body.pricePerDay])

        return {
            code: 201,
            message: "Created"
        }

    } catch (err) {
        return {
            code: 500,
            message: err.message
        }
    }
}