"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceUpdateValidation = exports.serviceValidation = void 0;
const zod_1 = require("zod");
exports.serviceValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: "Please enter a title for the service",
        }),
        description: zod_1.z.string({
            required_error: "Please enter a description",
        }),
        price: zod_1.z.number({
            required_error: "Please enter the price",
            invalid_type_error: "Price must be a number",
        }),
        duration: zod_1.z.number({
            required_error: "Please enter the duration (in minutes)",
            invalid_type_error: "Duration must be a number",
        }),
    }),
});
exports.serviceUpdateValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string({
            required_error: "Please enter a title for the service",
        })
            .optional(),
        description: zod_1.z
            .string({
            required_error: "Please enter a description",
        })
            .optional(),
        price: zod_1.z
            .number({
            required_error: "Please enter the price",
            invalid_type_error: "Price must be a number",
        })
            .optional(),
        duration: zod_1.z
            .number({
            required_error: "Please enter the duration (in minutes)",
            invalid_type_error: "Duration must be a number",
        })
            .optional(),
    }),
});
