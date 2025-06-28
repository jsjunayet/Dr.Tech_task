import { TErrorSource, TGenericError } from "../interface/error.interface";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const DuplicateError = (error: any): TGenericError => {
  const match = error.message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1];
  const errorSource: TErrorSource = [
    {
      path: "",
      message: `${extractedMessage} is already exists`,
    },
  ];

  const statusCode = 409;
  return {
    statusCode,
    message: "Duplicate error",
    errorSource,
  };
};
