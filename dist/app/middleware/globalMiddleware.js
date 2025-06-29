"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalMiddleWare = void 0;
const zod_1 = require("zod");
const AppErrors_1 = __importDefault(require("../error/AppErrors"));
const DuplicateErrors_1 = require("../error/DuplicateErrors");
const ZodErrors_1 = require("../error/ZodErrors");
const globalMiddleWare = (error, req, res, next) => {
    let statusCode = 500;
    let stack = "";
    let message = "Something is Wrong!";
    let errorsource = [
        {
            path: "",
            message: "Something is Wrong!",
        },
    ];
    if (error instanceof zod_1.ZodError) {
        const semplifiedError = (0, ZodErrors_1.ZodErrors)(error);
        statusCode = semplifiedError.statusCode;
        message = semplifiedError.message;
        errorsource = semplifiedError.errorsource;
        stack = error.stack;
    }
    else if (error.code === 11000) {
        const semplifyError = (0, DuplicateErrors_1.DuplicateError)(error);
        statusCode = semplifyError === null || semplifyError === void 0 ? void 0 : semplifyError.statusCode;
        message = semplifyError === null || semplifyError === void 0 ? void 0 : semplifyError.message;
        errorsource = semplifyError === null || semplifyError === void 0 ? void 0 : semplifyError.errorSource;
        stack = error.stack;
    }
    else if (error instanceof AppErrors_1.default) {
        statusCode = error.statusCode;
        message = error.message;
        errorsource = [
            {
                path: "",
                message: error.message,
            },
        ];
        stack = error.stack;
    }
    else if (error instanceof Error) {
        message = error.message;
        errorsource = [
            {
                path: "",
                message: error.message,
            },
        ];
        stack = error.stack;
    }
    res.status(statusCode).json({
        success: false,
        message: message,
        error: errorsource,
        stack: stack,
    });
};
exports.globalMiddleWare = globalMiddleWare;
