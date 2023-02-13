import { connection } from "../database/db.js";
import { _continue } from "../middlewares/generic.middlewares.js";

export async function listCustomers(id){
    const insert = id ? "WHERE id = $1" : ""
    const insArr = id ? [id] : []

    try{
        const games = await connection.query(`SELECT * FROM customers ${insert}`, insArr)
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





export async function createCustomer(body){
    try {
        await connection.query(`
            INSERT INTO customers (
                name, 
                phone, 
                cpf, 
                birthday
                ) 
            VALUES ($1, $2, $3, $4)`, 
            [body.name, body.phone, body.cpf, body.birthday])

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





export async function checkCustomerAlreadyExists(cpf){
    try {
        const customer = await connection.query(`SELECT cpf FROM customers WHERE cpf = $1`, [cpf])
        return customer.rowCount > 0 ? {
            code: 409,
            message: "This cpf is already taken"
        } : _continue

    } catch (err) {
        return {
            code: 500,
            message: err.message
        }
    }
}