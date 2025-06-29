"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllAuthController = void 0;
const catchAsync_1 = require("../../utility/catchAsync");
const sendResponse_1 = __importDefault(require("../../utility/sendResponse"));
const auth_service_1 = require("./auth.service");
const doctorRegister = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const data = yield auth_service_1.AllAuthService.doctorRegisterService(body);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Doctor Register is Success",
        statusCode: 201,
        data: data,
    });
}));
const patientRegister = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const data = yield auth_service_1.AllAuthService.patientRegisterService(body);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "patient Register is Success",
        statusCode: 201,
        data: data,
    });
}));
const authLogin = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const data = yield auth_service_1.AllAuthService.authLoginService(body.email, body.password);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Login successful",
        statusCode: 200,
        data: data,
    });
}));
exports.AllAuthController = {
    authLogin,
    doctorRegister,
    patientRegister,
};
