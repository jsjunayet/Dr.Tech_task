import { z } from "zod";

export const doctorRegistervalidation = z.object({
  body: z.object({
    name: z.string({
      required_error: "Please must fill up the name field",
      invalid_type_error: "Name must be a string",
    }),
    email: z
      .string({
        required_error: "Please must fill up the email field",
        invalid_type_error: "Email must be a string",
      })
      .email("Invalid email format"),
    phone: z.string({
      required_error: "Please must fill up the phone field",
      invalid_type_error: "Phone must be a string",
    }),
    password: z.string({
      required_error: "Please must fill up the password field",
      invalid_type_error: "Password must be a string",
    }),
    specialization: z.string({
      required_error: "Please must fill up the specialization field",
      invalid_type_error: "Specialization must be a string",
    }),
    hospitalName: z.string({
      required_error: "Please must fill up the hospital name field",
      invalid_type_error: "Hospital name must be a string",
    }),
    hospitalFloor: z.string({
      required_error: "Please must fill up the hospital floor field",
      invalid_type_error: "Hospital floor must be a string",
    }),
  }),
});
