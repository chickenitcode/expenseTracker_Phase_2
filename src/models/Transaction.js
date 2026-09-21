export class Transaction{
    constructor(id, type, category, amount, createdAt = new Date()){
        this.id = id;
        this.type = type;
        this.category = category;
        this.amount = amount;
        this.createdAt = createdAt;
    }
};