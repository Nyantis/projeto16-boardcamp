import dayjs from "dayjs";
import { createRental, listRentals, finishRental, deleteRental} from "../repository/rentals.repository.js";

export async function list(req, res){
    const { id } = res.locals
    const { code, message } = await listRentals(id)
    res.status(code).send(message)
}

export async function create(req, res){
    const rental = req.body
    const { pricePerDay } = res.locals
    const generated = {
        rentDate: dayjs().format('YYYY-MM-DD'),
        originalPrice: rental.daysRented * pricePerDay,
        returnDate: null,
        delayFee: null
    }
    
    const { code, message } = await createRental(rental, generated)
    return res.status(code).send(message)
}

// export async function finish(req, res){
//     const { id, rent } = res.locals
//     const returnDate = dayjs().format('YYYY-MM-DD')
//     let diff

//     if(dayjs(returnDate).isBefore(, 'day')){
//         diff = date1.diff(returnDate, 'day')
//     }

    
//     const { code, message } = await finishRental(id, req.body)
//     return res.status(code).send(message)
// }

// export async function exclude(req, res){
//     const { id } = res.locals
//     const { code, message} = await deleteRental(id)
//     return res.status(code).send(message)
// }