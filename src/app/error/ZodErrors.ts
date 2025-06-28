import { ZodError } from "zod";
import { TErrorSource } from "../interface/error.interface";

export const ZodErrors = (error: ZodError) => {
  const errorsource: TErrorSource = error.issues.map((field) => {
    return {
      path: field.path[field.path.length - 1] || "",
      message: field.message,
    };
  });
  const statusCode = 400;
  return {
    statusCode,
    message: "Validation Error",
    errorsource,
  };
};
