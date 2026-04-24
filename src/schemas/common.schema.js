const { z } = require("zod");

const idParamSchema = z.object({
    id: z.coerce.number().int().positive("ID must be a positive integer"),
});

const paginationQuerySchema = z.object({
    page: z.coerce.number().int().positive("Page must be a positive integer").optional(),
    limit: z.coerce.number().int().positive("Limit must be a positive integer").optional(),
});

const dateRangeQuerySchema = z.object({
    startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format for startDate",
    }).optional(),
    endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format for endDate",
    }).optional(),
});


const sortQuerySchema = z.object({
    sort: z.enum(["asc", "desc"]).optional(),
});

module.exports = {
    idParamSchema,
    paginationQuerySchema,
    dateRangeQuerySchema,
    sortQuerySchema,
};