import swaggerJSDoc from "swagger-jsdoc";

const options ={
    definition:{
        openapi: "3.0.0",
        info: {
            title: "Expense Tracker API",
            version: "1.0.0",
            description: "REST API for managing personal incomes and expenses"
        }, 
        servers:[{
            url: "http://localhost:3000"
        }]
    },
    apis: ["./src/routes/*.js"],
}

export const swaggerSpec = swaggerJSDoc(options);