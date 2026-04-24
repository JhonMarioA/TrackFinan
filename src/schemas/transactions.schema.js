const { z } = require("zod");

const createTransactionBodySchema = z.object({
    account_id: z.coerce.number().int().positive("Account ID must be a positive integer"),
    category_id: z.coerce.number().int().positive("Category ID must be a positive integer"),
    payment_method_id: z.coerce.number().int().positive("Payment Method ID must be a positive integer"),
    amount: z.coerce.number().positive("Amount must be a positive number"),
    description: z.string().max(255, "Description must be at most 255 characters long").optional().or(z.literal(""))
});


const updateTransactionBodySchema = z.object({
    account_id: z.coerce.number().int().positive("Account ID must be a positive integer"),
    category_id: z.coerce.number().int().positive("Category ID must be a positive integer"),
    payment_method_id: z.coerce.number().int().positive("Payment Method ID must be a positive integer"),
    amount: z.coerce.number().positive("Amount must be a positive number"),
    description: z.string().max(255, "Description must be at most 255 characters long").optional().or(z.literal(""))
});


const transactionIdParamSchema = z.object({
    id: z.coerce.number().int().positive("Transaction ID must be a positive integer"),
});

const transactionFilterQuerySchema = z.object({
    startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format for startDate",
    }).optional(),
    endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format for endDate",
    }).optional(),
    categoryId: z.coerce.number().int().positive("Category ID must be a positive integer").optional(),
    sort: z.enum(["asc", "desc"]).optional(),
    page: z.coerce.number().int().positive("Page must be a positive integer").optional(),
    limit: z.coerce.number().int().positive("Limit must be a positive integer").optional(),
});

module.exports = {
    createTransactionBodySchema,
    updateTransactionBodySchema,
    transactionIdParamSchema,
    transactionFilterQuerySchema
};

