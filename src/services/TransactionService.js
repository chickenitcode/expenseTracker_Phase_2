import { Transaction } from "../models/Transaction.js";
//service contains business logic

import { AppError } from "../errors/AppError.js";

export class TransactionService{
    constructor(repository){
        this.repository = repository;
    }

    async getAll(){
        return await this.repository.findAll();
    }

    async add(type, category, amount){
        const transactions = await this.repository.findAll();

        const id = 
        transactions.length === 0 ? 1:Math.max(...transactions.map(transaction => transaction.id)) +1;

        const transaction = new Transaction(id, type, category, amount);

        transactions.push(transaction);
        await this.repository.saveAll(transactions);

        return transaction;
    }
    async getById(id){
        const transaction = await this.repository.findById(id);
        if(!transaction){
            throw new AppError("Transaction not found!", 404);
        }
        return transaction;
    }
    async deleteById(id){
        const transactions = await this.repository.findAll();

        const exist = transactions.some(
            transaction => transaction.id === id 
        );

        if(!exist) throw new AppError("Transaction not found!", 404);

        const updateTransaction = transactions.filter(
            transaction => transaction.id !== id
        );

        await this.repository.saveAll(updateTransaction);

        return true;

    }
    async getSummary(){
        const transactions = await this.repository.findAll();

        const income = transactions
        .filter(transaction => transaction.type === "income")
        .reduce(
            (total, transaction) => total + transaction.amount, 0
        );

        const expense = transactions
        .filter(transaction => transaction.type === "expense")
        .reduce(
            (total, transaction) => total + transaction.amount, 0
        );

        return{
            income,
            expense, 
            balance: income - expense
        };
    }
    async updateById(id, updates){
        const transactions = await this.repository.findAll();

        const index = transactions.findIndex(
            transaction => transaction.id === id
        );

        if(index === -1) throw new AppError("Transaction not found", 404);

        const currentTransaction = transactions[index];

        const updateTransaction = { // merge two object -> later value overwrite earlier value
            ...currentTransaction, // transaction need to update
            ...updates,            // info update
            id: currentTransaction.id // protect id -> it prevent the client changing the id 
        };
        transactions[index] = updateTransaction;

        await this.repository.saveAll(transactions);

        return updateTransaction;
    }

}