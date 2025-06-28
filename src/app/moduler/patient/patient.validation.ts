import { z } from "zod";

export const patientRegisterValidation = z.object({
  body: z.object({
    name: z.string({
      required_error: "Please enter your name",
    }),
    email: z
      .string({
        required_error: "Please enter your email",
      })
      .email("Invalid email address"),
    phone: z.string({
      required_error: "Please enter your phone number",
    }),
    password: z.string({
      required_error: "Please enter your password",
    }),
    age: z.number({
      required_error: "Please enter your age",
      invalid_type_error: "Age must be a number",
    }),
    gender: z.enum(["male", "female", "other"], {
      required_error: "Please select a gender",
    }),
  }),
});
