//import { jsx } from "react/jsx-runtime";

export async function addTransaction(TransactionService, rl){
    const type = (
        await rl.question("Type (income/expense): ")
    ).trim().toLowerCase();

    if(type !== "income" && type !== "expense"){
        console.log("Invalid transaction type!");
        return;
    }

    const category = (
        await rl.question("Category: ")
    ).trim();

    if(!category){
        console.log("Category cannot be empty");
        return;
    }

    const amountInput = (
        await rl.question("Amount: ")
    );

    const amount = Number(amountInput);

    if(!Number.isFinite(amount) || amount < 0){
        console.log("Amount must be a possitive number!");
        return;
    }

    const transaction = await TransactionService.add(
        type,
        category,
        amount
    );
    console.log(`Transaction #${transaction.id} created!!!`);
}