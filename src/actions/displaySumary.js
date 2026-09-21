import { formatMoney } from "../utils/formatter.js";
export async function displaySumary(TransactionService){
    const transactions = await TransactionService.getAll();

    if(transactions.length === 0){
        console.log("\n No transactions found!");
        console.log("\n Please add your first transaction \n");
        return false;
    }

    const sumary = await TransactionService.getSumary();

    console.log("\n ===SUMARY===");
    console.log(`Income: ${formatMoney(sumary.income)}"`);
    console.log(`Expense: ${formatMoney(sumary.expense)}`);
    console.log(`Balance: ${formatMoney(sumary.balance)}`);

    return true;

}