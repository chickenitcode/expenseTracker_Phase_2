import { formatMoney } from "../utils/formatter.js"

export async function displayTransactions(service){
    const transactions = await service.getAll();

    if(transactions.length === 0){
        console.log("\n No transactions found!");
        return false;
    }
    console.log("\n ===TRANSACTIONS===");
    for(const transaction of transactions){
        console.log(
            `#${transaction.id} | ${transaction.type} | ${transaction.category} | ${formatMoney(transaction.amount)}`
        );
    }
    return true;
}