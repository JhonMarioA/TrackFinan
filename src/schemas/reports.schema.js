const { z } = require("zod");

const expensesByCategoryQuerySchema = z.object({
    startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format for startDate",
    }).optional(),
    endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format for endDate",
    }).optional(),
});

const balanceQuerySchema = z.object({
    startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format for startDate",
    }),
    endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format for endDate",
    }),
}).refine((data) => new Date(data.startDate) <= new Date(data.endDate), {
    message: "startDate must be before or equal to endDate",
    path: ["endDate"],
});

module.exports = {
    expensesByCategoryQuerySchema,
    balanceQuerySchema,
};
