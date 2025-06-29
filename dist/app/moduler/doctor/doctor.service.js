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
exports.doctorService = void 0;
const AppErrors_1 = __importDefault(require("../../error/AppErrors"));
const appointment_model_1 = require("../appointment/appointment.model");
const doctor_model_1 = require("./doctor.model");
const GetallDoctor = (SearchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const { hospitalName, specialization, serviceName } = SearchTerm;
    const filter = {};
    if (hospitalName)
        filter.hospitalName = { $regex: hospitalName, $options: "i" };
    if (specialization)
        filter.specialization = { $regex: specialization, $options: "i" };
    let doctors = yield doctor_model_1.DoctorModel.find(filter)
        .populate({
        path: "services",
        match: serviceName
            ? { title: { $regex: serviceName, $options: "i" } }
            : {},
    })
        .populate("availability");
    if (serviceName) {
        doctors = doctors === null || doctors === void 0 ? void 0 : doctors.filter((doc) => { var _a, _b; return (_b = (_a = doc.services) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0 > 0; });
    }
    return doctors;
});
const getDoctorProfile = (doctorId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const doctor = yield doctor_model_1.DoctorModel.findById(doctorId)
        .select("name hospitalName hospitalFloor services availability")
        .populate("services")
        .populate("availability");
    if (!doctor) {
        throw new AppErrors_1.default(404, "Doctor not found");
    }
    const acceptedAppointments = yield appointment_model_1.AppointmentModel.find({
        doctorId,
        status: "accepted",
    });
    const remainingSlotsPerService = (_a = doctor === null || doctor === void 0 ? void 0 : doctor.services) === null || _a === void 0 ? void 0 : _a.map((service) => {
        var _a;
        const serviceAvailability = (_a = doctor === null || doctor === void 0 ? void 0 : doctor.availability) === null || _a === void 0 ? void 0 : _a.filter((a) => (a === null || a === void 0 ? void 0 : a.serviceId) && a.serviceId.toString() === service._id.toString());
        const remainingSlots = serviceAvailability === null || serviceAvailability === void 0 ? void 0 : serviceAvailability.map((slot) => {
            const bookedSlots = acceptedAppointments.filter((appt) => appt.serviceId.toString() === service._id.toString() &&
                appt.selectedDate.toISOString().slice(0, 10) === slot.day &&
                appt.timeSlot === slot.timeSlot);
            return {
                day: slot.day,
                timeSlot: slot.timeSlot,
                remaining: 1 - bookedSlots.length,
            };
        });
        return {
            serviceId: service._id,
            title: service.title,
            remainingSlots,
        };
    });
    const result = {
        doctor: {
            name: doctor.name,
            hospitalName: doctor.hospitalName,
            hospitalFloor: doctor.hospitalFloor,
        },
        services: doctor.services,
        availability: doctor.availability,
        remainingSlotsPerService,
    };
    return result;
});
exports.doctorService = {
    GetallDoctor,
    getDoctorProfile,
};
