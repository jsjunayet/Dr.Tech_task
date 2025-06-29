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
const mongoose_1 = __importDefault(require("mongoose"));
const doctor_model_1 = require("../doctor/doctor.model");
const service_model_1 = __importDefault(require("./service.model"));
const createService = (serviceData, doctorId) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const service = new service_model_1.default(Object.assign(Object.assign({}, serviceData), { doctor: doctorId }));
        yield service.save({ session });
        yield doctor_model_1.DoctorModel.findByIdAndUpdate(doctorId, { $push: { services: service._id } }, { session });
        yield session.commitTransaction();
        return service;
    }
    catch (error) {
        yield session.abortTransaction();
        throw error;
    }
    finally {
        session.endSession();
    }
});
const updateService = (serviceId, doctorId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = service_model_1.default.findOneAndUpdate({ _id: serviceId, doctor: doctorId }, updateData, { new: true });
    return result;
});
const deleteService = (serviceId, doctorId) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const service = yield service_model_1.default.findOneAndDelete({ _id: serviceId, doctor: doctorId }, { session });
        if (!service) {
            throw new Error("Service not found or not authorized");
        }
        yield doctor_model_1.DoctorModel.findByIdAndUpdate(doctorId, { $pull: { services: service._id } }, { session });
        yield session.commitTransaction();
    }
    catch (error) {
        yield session.abortTransaction();
        throw error;
    }
    finally {
        session.endSession();
    }
});
const getDoctorServices = (doctorId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.default.find({ doctor: doctorId });
    return result;
});
exports.doctorService = {
    createService,
    updateService,
    deleteService,
    getDoctorServices,
};
