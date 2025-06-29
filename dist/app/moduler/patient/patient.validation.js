"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientRegisterValidation = void 0;
const zod_1 = require("zod");
exports.patientRegisterValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Please enter your name",
        }),
        email: zod_1.z
            .string({
            required_error: "Please enter your email",
        })
            .email("Invalid email address"),
        phone: zod_1.z.string({
            required_error: "Please enter your phone number",
        }),
        password: zod_1.z.string({
            required_error: "Please enter your password",
        }),
        age: zod_1.z.number({
            required_error: "Please enter your age",
            invalid_type_error: "Age must be a number",
        }),
        gender: zod_1.z.enum(["male", "female", "other"], {
            required_error: "Please select a gender",
        }),
    }),
});
