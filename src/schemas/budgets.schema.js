const { z } = require("zod");

const createBudgetBodySchema = z.object({
    category_id: z.coerce.number().int().positive("Category ID must be a positive integer"),
    amount: z.coerce.number().positive("Amount must be a positive number"),
    month: z.coerce.number().int().min(1, "Month must be between 1 and 12").max(12, "Month must be between 1 and 12"),
    year: z.coerce.number().int().min(2000, "Year must be 2000 or later")
});

const updateBudgetBodySchema = z.object({
    amount: z.coerce.number().positive("Amount must be a positive number"),
});

const budgetIdParamSchema = z.object({
    id: z.coerce.number().int().positive("Budget ID must be a positive integer"),
});

module.exports = {
    createBudgetBodySchema,
    updateBudgetBodySchema,
    budgetIdParamSchema
};

