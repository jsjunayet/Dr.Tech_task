"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorRegistervalidation = void 0;
const zod_1 = require("zod");
exports.doctorRegistervalidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Please must fill up the name field",
            invalid_type_error: "Name must be a string",
        }),
        email: zod_1.z
            .string({
            required_error: "Please must fill up the email field",
            invalid_type_error: "Email must be a string",
        })
            .email("Invalid email format"),
        phone: zod_1.z.string({
            required_error: "Please must fill up the phone field",
            invalid_type_error: "Phone must be a string",
        }),
        password: zod_1.z.string({
            required_error: "Please must fill up the password field",
            invalid_type_error: "Password must be a string",
        }),
        specialization: zod_1.z.string({
            required_error: "Please must fill up the specialization field",
            invalid_type_error: "Specialization must be a string",
        }),
        hospitalName: zod_1.z.string({
            required_error: "Please must fill up the hospital name field",
            invalid_type_error: "Hospital name must be a string",
        }),
        hospitalFloor: zod_1.z.string({
            required_error: "Please must fill up the hospital floor field",
            invalid_type_error: "Hospital floor must be a string",
        }),
    }),
});
