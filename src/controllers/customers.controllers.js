import { createCustomer, listCustomers } from "../repository/customers.repository.js";

export async function list(req, res){
    const { id } = res.locals
    const { code, message } = await listCustomers(id)
    res.status(code).send(message)
}

export async function create(req, res){
    const { code, message } = await createCustomer(req.body)
    return res.status(code).send(message)
}