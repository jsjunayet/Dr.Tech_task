"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const globalMiddleware_1 = require("./app/middleware/globalMiddleware");
const noFound_1 = __importDefault(require("./app/middleware/noFound"));
const router_1 = __importDefault(require("./app/router"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/", router_1.default);
app.use(noFound_1.default);
app.use(globalMiddleware_1.globalMiddleWare);
exports.default = app;
