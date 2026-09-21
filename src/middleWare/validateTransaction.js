export function validateTransaction(req, res, next){
    const {type, category, amount} = req.body;

    if(!type || !category || amount === undefined){
        return res.status(400).json({
            message: "Type, category and amount must be required!"
        });
    }

    if(!["income", "expense"].includes(type)){
        return res.status(400).json({
            message: "Type must be income or expense"
        });
    }

    if(typeof category !== "string" || category.trim() === ""){
        return res.status(400).json({
            message: "Category must be a non-empty string"
        });
    }

    if(typeof amount !== "number" || amount <= 0){
        return res.status(400).json({
            message: "Amount must be a possitive number"
        });
    }

    next(); 
    // this is a key concept => it means:  validation pass and continue to the next middleware/controller
}