import { AppError } from "../errors/AppError.js";

export function validateTransactionUpdate(req, res, next){
    const {type, category, amount} = req.body;
    
    if(Object.keys(req.body).length === 0) 
        throw new AppError("At least one fild is required", 400);

    if(type !== undefined && !["income", "expense"].includes(type)) 
        throw new AppError("Type must be income or expense", 400);
    
    if(category !== undefined && (typeof category !== "string" || category.trim() ===""))
        throw new AppError("Category must be non-empty string", 400);

    if(amount !== undefined && (typeof amount !== "number" || amount <= 0))
        throw new AppError("Amount must be a possitive number", 400)

    next();
}




