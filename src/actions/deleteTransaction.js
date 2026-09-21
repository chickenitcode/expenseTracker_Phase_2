export async function deleteTransaction(TransactionService, rl){
    const input = await rl.question("Transaction id: ");

    const id = Number(input);

    if(!Number.isInteger(id)){
        console.log("Invalid ID!");
        return;
    }

    const deleted = await TransactionService.deleteById(id);
    if(!deleted){
        console.log("Transaction not found!");
        return;
    }
    console.log(`Transaction #${id} deleted!!!`);
}