const { z } = require("zod");

const createCategoryBodySchema = z.object({
    name: z.string().min(1, "Name is required").max(255, "Name must be at most 255 characters long"),
    transaction_type_id: z.coerce.number().int().positive("Transaction Type ID must be a positive integer"),
});


const updateCategoryBodySchema = z.object({
    name: z.string().min(1, "Name is required").max(255, "Name must be at most 255 characters long"),
});

const categoryIdParamSchema = z.object({
    id: z.coerce.number().int().positive("Category ID must be a positive integer"),
});

module.exports = {
    createCategoryBodySchema,
    updateCategoryBodySchema,
    categoryIdParamSchema
};

