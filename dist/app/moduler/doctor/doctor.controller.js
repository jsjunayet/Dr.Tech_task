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
exports.doctorController = void 0;
const catchAsync_1 = require("../../utility/catchAsync");
const sendResponse_1 = __importDefault(require("../../utility/sendResponse"));
const doctor_service_1 = require("./doctor.service");
const getAllDoctor = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const SearchTerm = req.query;
    const data = yield doctor_service_1.doctorService.GetallDoctor(SearchTerm);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Retrieved All Doctor successfully",
        statusCode: 201,
        data: data,
    });
}));
const getDoctorProfile = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorId = req.params.id;
    const data = yield doctor_service_1.doctorService.getDoctorProfile(doctorId);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Retrieved  Doctor Profile successfully",
        statusCode: 201,
        data: data,
    });
}));
exports.doctorController = {
    getAllDoctor,
    getDoctorProfile,
};
