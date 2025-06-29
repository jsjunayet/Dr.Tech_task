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
exports.AppointmentContoller = void 0;
const catchAsync_1 = require("../../utility/catchAsync");
const sendResponse_1 = __importDefault(require("../../utility/sendResponse"));
const appointment_service_1 = require("./appointment.service");
const createAppointment = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const body = req.body;
    const patientId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userID;
    const data = yield appointment_service_1.appoinmentService.createAppointment(body, patientId);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Appointment requested",
        statusCode: 201,
        data: data,
    });
}));
const GetPatientAppointment = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const patientId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userID;
    const data = yield appointment_service_1.appoinmentService.GetPatientAppointment(patientId);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Patient Retrive all Appointment",
        statusCode: 200,
        data: data,
    });
}));
exports.AppointmentContoller = {
    createAppointment,
    GetPatientAppointment,
};
