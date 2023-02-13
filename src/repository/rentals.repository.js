import { connection } from "../database/db.js";
import { _continue } from "../middlewares/generic.middlewares.js";

export async function listRentals(){
    try{
        const customers = await connection.query(`
        SELECT 
          rentals.id AS rentalId,
          rentals."customerId",
          rentals."gameId",
          rentals."rentDate",
          rentals."daysRented",
          rentals."returnDate",
          rentals."originalPrice",
          rentals."delayFee",
          customers.name as "customerName",
          games.name as "gameName"
        FROM rentals
        JOIN customers ON
          customers.id = rentals."customerId"
        JOIN games ON
          games.id = rentals."gameId"
        `)

        const data = customers.rows.map(item => {
            return {
                    id: item.rentalId,
                    customerId: item.customerId,
                    gameId: item.gameId,
                    rentDate: item.rentDate,
                    daysRented: item.daysRented,
                    returnDate: item.returnDate, // troca pra uma data quando já devolvido
                    originalPrice: item.originalPrice,
                    delayFee: item.delayFee,
                    customer: {
                        id: 1,
                        name: item.customerName
                    },
                    game: {
                        id: 1,
                        name: item.gameName
                    }
                }
            }
        )


        return {
            code: 200,
            message: data
        }

    }catch(err){
        return {
            code: 500,
            message: err.message
        }
    }
}


/////////////////////////////////////////////////


export async function createRental(reqBody, generated){
    const { customerId, gameId, daysRented } = reqBody
    const { rentDate, originalPrice, returnDate, delayFee } = generated

    try {
        await connection.query(`
        INSERT INTO rentals (
          "customerId",
          "gameId",
          "rentDate",
          "daysRented",
          "returnDate",
          "originalPrice",
          "delayFee"
          ) 
        VALUES ($1, $2, $3, $4, $5, $6, $7)`, 
        [
            customerId,
            gameId,
            rentDate,
            daysRented,
            returnDate,
            originalPrice,
            delayFee
        ])

        return {
            code: 201,
            message: null
        }

    } catch (err) {
        return {
            code: 500,
            message: err.message
        }
    }
}


/////////////////////////////////////////////////


export async function finishRental(id, body){
    const { name, phone, cpf, birthday } = body

    try {
        await connection.query(`
        UPDATE customers SET 
          name = $1,
          phone = $2,
          cpf = $3,
          birthday = $4
        WHERE id = $5`, 
        [name, phone, cpf, birthday, id])

        return {
            code: 201,
            message: null
        }
        
    } catch (err) {
        return {
            code: 500,
            message: err.message
        }
    }
}


/////////////////////////////////////////////////


export async function deleteRental(id, body){
    const { name, phone, cpf, birthday } = body

    try {
        await connection.query(`
        UPDATE customers SET 
          name = $1,
          phone = $2,
          cpf = $3,
          birthday = $4
        WHERE id = $5`, 
        [name, phone, cpf, birthday, id])

        return {
            code: 201,
            message: null
        }
        
    } catch (err) {
        return {
            code: 500,
            message: err.message
        }
    }
}


/////////////////////////////////////////////////


export async function checkIDsExistence(customerId, gameId){
    try {
        const id = await connection.query(`
        SELECT 
          customers.name,
          games."pricePerDay"
        FROM customers JOIN games
        ON customers.id = $1 
        AND 
        games.id = $2`, [customerId, gameId])
        return id.rows < 2 ? {
            code: 400,
            message: "This customer/game doesn't exist",
        } : _continue({info: id.rows[0]})

    } catch (err) {
        return {
            code: 500,
            message: err.message
        }
    }
}


/////////////////////////////////////////////////


export async function checkGameAvailable(gameId){
    try {
        const game = await connection.query(`
        SELECT 
        rentals.id, "stockTotal"
        FROM rentals JOIN games 
        ON "gameId" = $1
        AND
        games.id = $1
        `, [gameId])
        return game.rowCount < game.rows[0].stockTotal ?
            _continue()
        :
        {
            code: 409,
            message: "This game isn't in stock"
        }


    } catch (err) {
        return {
            code: 500,
            message: err.message
        }
    }
}