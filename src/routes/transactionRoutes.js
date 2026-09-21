import {Router} from "express";
import {
    getTransactions,
    getTransactionById,
    createTransaction,
    deleteTransaction,
    getSummary,
    updateTransaction,
} from "../controller/transactionController.js";

import { validateTransaction } from "../middleWare/validateTransaction.js";
import { validateTransactionUpdate } from "../middleWare/validateTransactionUpdate.js";


const router = Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         type:
 *           type: string
 *           enum:
 *             - income
 *             - expense
 *           example: expense
 *         category:
 *           type: string
 *           example: food
 *         amount:
 *           type: number
 *           example: 50000
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2026-09-20T08:30:00.000Z"
 *
 *     CreateTransactionInput:
 *       type: object
 *       required:
 *         - type
 *         - category
 *         - amount
 *       properties:
 *         type:
 *           type: string
 *           enum:
 *             - income
 *             - expense
 *           example: expense
 *         category:
 *           type: string
 *           minLength: 1
 *           example: food
 *         amount:
 *           type: number
 *           exclusiveMinimum: 0
 *           example: 50000
 *
 *     UpdateTransactionInput:
 *       type: object
 *       minProperties: 1
 *       additionalProperties: false
 *       properties:
 *         type:
 *           type: string
 *           enum:
 *             - income
 *             - expense
 *           example: income
 *         category:
 *           type: string
 *           minLength: 1
 *           example: salary
 *         amount:
 *           type: number
 *           exclusiveMinimum: 0
 *           example: 10000000
 *
 *     TransactionSummary:
 *       type: object
 *       properties:
 *         income:
 *           type: number
 *           example: 10000000
 *         expense:
 *           type: number
 *           example: 3000000
 *         balance:
 *           type: number
 *           example: 7000000
 *
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Transaction not found!
 */


/**
 * @openapi
 * /api/transactions:
 *   get:
 *     summary: Get all transactions
 *     description: Return all income and expense transactions.
 *     tags:
 *       - Transactions
 *     responses:
 *       "200":
 *         description: Transactions retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Transaction"
 *       "500":
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 */
router.get("/", getTransactions);

/**
 * @openapi
 * /api/transactions/summary:
 *   get:
 *     summary: Get transaction summary
 *     description: Calculate total income, total expense and current balance.
 *     tags:
 *       - Transactions
 *     responses:
 *       "200":
 *         description: Summary calculated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/TransactionSummary"
 *       "500":
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 */
router.get("/summary", getSummary);

/**
 * @openapi
 * /api/transactions/{id}:
 *   get:
 *     summary: Get a transaction by ID
 *     tags:
 *       - Transactions
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Transaction ID
 *         schema:
 *           type: integer
 *           minimum: 1
 *         example: 1
 *     responses:
 *       "200":
 *         description: Transaction retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Transaction"
 *       "404":
 *         description: Transaction not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *       "500":
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 */
router.get("/:id", getTransactionById);

/**
 * @openapi
 * /api/transactions:
 *   post:
 *     summary: Create a transaction
 *     tags:
 *       - Transactions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreateTransactionInput"
 *     responses:
 *       "201":
 *         description: Transaction created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Transaction"
 *       "400":
 *         description: Invalid transaction data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *       "500":
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 */
router.post("/", validateTransaction, createTransaction);

/**
 * @openapi
 * /api/transactions/{id}:
 *   delete:
 *     summary: Delete a transaction
 *     tags:
 *       - Transactions
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Transaction ID
 *         schema:
 *           type: integer
 *           minimum: 1
 *         example: 1
 *     responses:
 *       "200":
 *         description: Transaction deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Transaction deleted successfully!
 *       "404":
 *         description: Transaction not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *       "500":
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 */
router.delete("/:id", deleteTransaction);


/**
 * @openapi
 * /api/transactions/{id}:
 *   patch:
 *     summary: Update a transaction
 *     description: Update one or more fields of an existing transaction.
 *     tags:
 *       - Transactions
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Transaction ID
 *         schema:
 *           type: integer
 *           minimum: 1
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UpdateTransactionInput"
 *     responses:
 *       "200":
 *         description: Transaction updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Transaction"
 *       "400":
 *         description: Empty or invalid update data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *       "404":
 *         description: Transaction not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *       "500":
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 */
router.patch("/:id", validateTransactionUpdate, updateTransaction);
``
export default router;