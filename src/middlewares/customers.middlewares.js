import { customerSchema } from "../models/Customers.js";
import { checkCustomerAlreadyExists, checkCustomerCpf } from "../repository/customers.repository.js";
import schemaValidation from "./generic.middlewares.js";

export async function createCustomerValidation(req, res, next) {
    const customer = req.body;

    {const { code, message } = schemaValidation(customerSchema, customer)
    if(code){return res.status(code).send(message)}}

    {const { code, message } = await checkCustomerAlreadyExists(customer.cpf)
    if(code){return res.status(code).send(message)}}

    next();
}

export async function updateCustomerValidation(req, res, next) {
    const customer = req.body;
    const { id } = res.locals

    {const { code, message } = schemaValidation(customerSchema, customer)
    if(code){return res.status(code).send(message)}}

    {const { code, message } = await checkCustomerCpf(customer.cpf, id)
    if(code){return res.status(code).send(message)}}

    next();
}