"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZodErrors = void 0;
const ZodErrors = (error) => {
    const errorsource = error.issues.map((field) => {
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
exports.ZodErrors = ZodErrors;
