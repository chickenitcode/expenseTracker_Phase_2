import express from "express";
import swaggerUi from "swagger-ui-express";
import transactionRoutes from "./routes/transactionRoutes.js";

import { errorHandler } from "./middleWare/errorHandler.js";
import { swaggerSpec } from "./config/swagger.js";

const app = express(); //initialize

app.use(express.json()); // this is middleware

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/transactions", transactionRoutes); // this connect a router to your application
// -> Express combine the prefix with the routes inside the router

app.use(errorHandler);

export default app;