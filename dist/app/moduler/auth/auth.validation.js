"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authvalidationAll = void 0;
const zod_1 = require("zod");
const authLoginvalidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({
            required_error: "please must be fill up email field",
            invalid_type_error: "Name must be a string",
        })
            .email(),
        password: zod_1.z.string({
            required_error: "please must be fill up password field",
            invalid_type_error: "Name must be a string",
        }),
    }),
});
exports.authvalidationAll = {
    authLoginvalidation,
};
