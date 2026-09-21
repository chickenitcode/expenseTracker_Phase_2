import { AppError } from "../errors/AppError.js";
import {TransactionRepository} from "../repositories/TransactionRepository.js";

import {TransactionService} from "../services/TransactionService.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const repositories = new TransactionRepository();
const services = new TransactionService(repositories);

// export async function getTransactions(req, res){
//     const transactions = await services.getAll();

//     res.status(200).json(transactions);
// }
export const getTransactions = asyncHandler(async (req, res) =>{
    const transactions = await services.getAll();
    res.status(200).json(transactions);
});


export const createTransaction = asyncHandler(async (req, res) => {
    const {type, category, amount} = req.body;
    const transaction = await services.add(type, category, amount);
    res.status(201).json(transaction);
});

// export async function getTransactionById(req, res, next){
//     try{
//         const id = Number(req.params.id); //url parameter is string -> convert to number 

//         const transaction = await services.getById(id);

//         // if(!transaction){
//         //     return res.status(404).json({message: "Transaction not found!"});
//         // }
//         res.status(200).json(transaction);
//     }
//     catch(error){
//         next(error); // => it sends the error to Express error-handling middleware
//     }  
// }

export const getTransactionById = asyncHandler(async (req, res) => {
    const id = Number(req.params.id);

    const transaction = await services.getById(id);

    res.status(200).json(transaction);
});




// export async function deleteTransaction(req, res, next){
//     try {
//         const id = Number(req.params.id);

//         await services.deleteById(id);

//         // if(!deleted){
//         //     return res.status(404).json({message: "Transaction not found!"});
//         // }
//         res.status(200).json({message: "Transaction deleted successfully!"});
//     } catch (error) {
//         next(error);
//     }
// }


export const deleteTransaction = asyncHandler(async (req, res) =>{
        const id = Number(req.params.id);

        await services.deleteById(id);

        res.status(200).json({message: "Transaction deleted successfully!"});
});


export async function getSummary(req, res){
    const summary = await services.getSummary();

    res.status(200).json(summary);
}

export const updateTransaction = asyncHandler(async(req, res) => {
   
        const id = Number(req.params.id);
        //if(!id || !Number.isInteger(id) || id <= 0) throw new AppError("Invalid transaction ID", 400);
        
        const update = req.body;
        const transaction = await services.updateById(id, update);

        res.status(200).json(transaction);

});