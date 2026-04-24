const { z } = require("zod");

const createPaymentMethodBodySchema = z.object({
    name: z.string().min(1, "Name is required").max(255, "Name must be at most 255 characters long")
});

const updatePaymentMethodBodySchema = z.object({
    name: z.string().min(1, "Name is required").max(255, "Name must be at most 255 characters long")
});

const paymentMethodParamSchema = z.object({
    id: z.coerce.number().int().positive("Payment method ID must be a positive integer")
});

module.exports = {
    createPaymentMethodBodySchema,
    updatePaymentMethodBodySchema,
    paymentMethodParamSchema
};

