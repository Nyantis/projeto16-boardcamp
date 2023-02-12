import { getCustomerByName } from "../repository/retrieve.repository.js";

export function retrieve(req, res){
    const customer = getCustomerByName("caio")
    res.status(200).send(customer);
}