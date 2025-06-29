"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicateError = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const DuplicateError = (error) => {
    const match = error.message.match(/"([^"]*)"/);
    const extractedMessage = match && match[1];
    const errorSource = [
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
exports.DuplicateError = DuplicateError;
