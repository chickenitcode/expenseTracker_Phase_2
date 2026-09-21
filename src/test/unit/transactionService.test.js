import { describe, it, expect, vi } from "vitest";
import { TransactionService } from "../../services/TransactionService.js";

describe("TransactionService", () =>{ //group related test
    it("Should calculate financial summary correctly!", async()=>{
        const mockRepository = {
            findAll: vi.fn().mockResolvedValue([
                {
                    id: 1, 
                    type: "income",
                    category: "salary",
                    amount: 5000,
                },
                {
                    id: 2, 
                    type: "expense",
                    category: "food",
                    amount: 1000,
                },
            ])
        };

        const service = new TransactionService(mockRepository);

        const summary = await service.getSummary();

        expect(summary).toEqual({
            income: 5000,
            expense: 1000,
            balance: 4000,
        });

    });
});