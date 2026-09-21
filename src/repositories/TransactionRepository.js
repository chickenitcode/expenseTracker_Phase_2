import fs from "node:fs/promises";

const DATA_FILE = "./src/data/transaction.json";

export class TransactionRepository{
    async findAll(){
        try {

            const data = await fs.readFile(DATA_FILE, "utf-8");
            return JSON.parse(data);

        } catch (error) {
            if (error.code === "ENOENT"){
                await this.saveAll([]);
                return [];
            }
            throw error;
        }
    }

    async saveAll(transactions){
        const json = JSON.stringify(transactions, null, 2);

        await fs.writeFile(DATA_FILE, json, "utf-8");
    }

    async findById(id){
        const transactions = await this.findAll();
        return transactions.find(
            transaction => transaction.id === id
        );
    }

}