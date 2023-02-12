import { connection } from "../database/db.js";

export function getCustomerByName(name){

    try{
        const users = connection.query(`SELECT * FROM customers WHERE LOWER(name) LIKE LOWER($1)`, [name])

        return users
    }catch(err){
 
        res.status(500).send(err.message);
    
    }
    
}