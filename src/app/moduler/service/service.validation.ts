import { z } from "zod";

export const serviceValidation = z.object({
  body: z.object({
    title: z.string({
      required_error: "Please enter a title for the service",
    }),
    description: z.string({
      required_error: "Please enter a description",
    }),
    price: z.number({
      required_error: "Please enter the price",
      invalid_type_error: "Price must be a number",
    }),
    duration: z.number({
      required_error: "Please enter the duration (in minutes)",
      invalid_type_error: "Duration must be a number",
    }),
  }),
});
