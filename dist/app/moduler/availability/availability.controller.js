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
exports.availabilityContoller = void 0;
const catchAsync_1 = require("../../utility/catchAsync");
const sendResponse_1 = __importDefault(require("../../utility/sendResponse"));
const availability_service_1 = require("./availability.service");
const createAvailability = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const body = req.body;
    const doctorId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userID;
    const data = yield availability_service_1.availabilityService.createAvailability(body, doctorId);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Slots added is Success",
        statusCode: 201,
        data: data,
    });
}));
const getDoctorAppointments = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const doctorId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userID;
    const statusQuery = req.query.status;
    const allowedStatuses = [
        "pending",
        "accepted",
        "cancelled",
        "completed",
    ];
    const status = allowedStatuses.includes(statusQuery)
        ? statusQuery
        : "pending";
    const data = yield availability_service_1.availabilityService.getDoctorAppointments(doctorId, status);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Retrieved all doctor appointments",
        statusCode: 200,
        data: data,
    });
}));
const updatedDoctorAppointments = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { status } = req.body;
    const data = yield availability_service_1.availabilityService.updatedDoctorAppointments(id, status);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Update Appoinment is  Success",
        statusCode: 200,
        data: data,
    });
}));
exports.availabilityContoller = {
    createAvailability,
    getDoctorAppointments,
    updatedDoctorAppointments,
};
