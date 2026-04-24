const { z } = require("zod");

const createAccountBodySchema = z.object({
    type_id: z.coerce.number().int().positive("Type ID must be a positive integer"),
    name: z.string().min(1, "Name is required").max(255, "Name must be at most 255 characters long"),
});


const updateAccountBodySchema = z.object({
    name: z.string().min(1, "Name is required").max(255, "Name must be at most 255 characters long"),
});


const accountIdParamSchema = z.object({
    id: z.coerce.number().int().positive("Account ID must be a positive integer"),
});

module.exports = {
    createAccountBodySchema,
    updateAccountBodySchema,
    accountIdParamSchema,
};