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
exports.appoinmentService = void 0;
const AppErrors_1 = __importDefault(require("../../error/AppErrors"));
const appointment_model_1 = require("./appointment.model");
const createAppointment = (payload, patientId) => __awaiter(void 0, void 0, void 0, function* () {
    const { doctorId, serviceId, selectedDate, timeSlot } = payload;
    const exists = yield appointment_model_1.AppointmentModel.findOne({
        doctorId,
        serviceId,
        selectedDate: new Date(selectedDate),
        timeSlot,
        status: { $in: ["accepted"] },
    });
    if (exists) {
        throw new AppErrors_1.default(400, "Slot already booked");
    }
    const appointment = yield appointment_model_1.AppointmentModel.create({
        doctorId,
        serviceId,
        patientId,
        selectedDate: new Date(selectedDate),
        timeSlot,
        status: "pending",
    });
    return appointment;
});
const GetPatientAppointment = (patientId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield appointment_model_1.AppointmentModel.find({ patientId }).populate("doctorId", "-password");
    return result;
});
exports.appoinmentService = {
    createAppointment,
    GetPatientAppointment,
};
