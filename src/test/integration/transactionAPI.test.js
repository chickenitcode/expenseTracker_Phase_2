import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../../app.js";

describe("Transaction test API", ()=>{
    it("POST create a transaction", async ()=>{
        const response = await request(app)
        .post("/api/transactions")
        .send({
            type: "expense",
            category: "food",
            amount: 50000,
        });

        expect(response.status).toBe(201);
        expect(response.body.type).toBe("expense");
        expect(response.body.amount).toBe(50000);

    });
});