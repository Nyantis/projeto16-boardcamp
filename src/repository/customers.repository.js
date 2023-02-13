import { connection } from "../database/db.js";
import { _continue } from "../middlewares/generic.middlewares.js";

export async function listCustomers(id){
    const insert = id ? "WHERE id = $1" : ""
    const insArr = id ? [id] : []

    try{
        const customers = await connection.query(`SELECT * FROM customers ${insert}`, insArr)
        return {
            code: 200,
            message: customers.rows
        }

    }catch(err){
        return {
            code: 500,
            message: err.message
        }
    }
}


/////////////////////////////////////////////////


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


export async function updateCustomer(id, body){
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


/////////////////////////////////////////////////


export async function checkCustomerCpf(cpf, id){
    try {
        const customer = await connection.query(`SELECT cpf FROM customers WHERE cpf = $1 AND id = $2`, [cpf, id])
        return !customer.rowCount > 0 ? {
            code: 409,
            message: "This cpf isn't from this customer"
        } : _continue

    } catch (err) {
        return {
            code: 500,
            message: err.message
        }
    }
}