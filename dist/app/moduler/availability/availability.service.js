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
exports.availabilityService = void 0;
const AppErrors_1 = __importDefault(require("../../error/AppErrors"));
const appointment_model_1 = require("../appointment/appointment.model");
const doctor_model_1 = require("../doctor/doctor.model");
const availability_model_1 = require("./availability.model");
const createAvailability = (payload, doctorId) => __awaiter(void 0, void 0, void 0, function* () {
    const { day, timeSlots, service } = payload;
    const availability = yield availability_model_1.AvailabilityModel.create({
        doctor: doctorId,
        service,
        day,
        timeSlots,
    });
    yield doctor_model_1.DoctorModel.findByIdAndUpdate(doctorId, {
        $push: { availability: availability._id },
    });
    return availability;
});
const getDoctorAppointments = (doctorId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const appointments = yield appointment_model_1.AppointmentModel.find({
        doctorId,
        status,
    })
        .populate("patientId", "name email phone")
        .populate("serviceId", "title price duration");
    return appointments;
});
const updatedDoctorAppointments = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    if (!["accepted", "cancelled", "completed"].includes(status)) {
        throw new AppErrors_1.default(400, "Invalid status value");
    }
    const appointment = yield appointment_model_1.AppointmentModel.findById(id);
    if (!appointment) {
        throw new AppErrors_1.default(400, "Appointment not found");
    }
    appointment.status = status;
    yield appointment.save();
    return appointment;
});
exports.availabilityService = {
    createAvailability,
    getDoctorAppointments,
    updatedDoctorAppointments,
};
