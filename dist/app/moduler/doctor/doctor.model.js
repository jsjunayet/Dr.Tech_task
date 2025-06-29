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
exports.DoctorModel = void 0;
// models/doctor.model.ts
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = require("mongoose");
const AppErrors_1 = __importDefault(require("../../error/AppErrors"));
const patient_model_1 = require("../patient/patient.model");
const doctorSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    specialization: { type: String, required: true },
    hospitalName: { type: String, required: true },
    hospitalFloor: { type: String, required: true },
    role: { type: String, default: "doctor" },
    profileImage: { type: String, default: "" },
    services: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Service" }],
    availability: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Availability" }],
}, {
    timestamps: true,
});
doctorSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isNew) {
            const existingDoctor = yield exports.DoctorModel.findOne({ email: this.email });
            if (existingDoctor) {
                throw new AppErrors_1.default(409, "This Doctor is already registered");
            }
            const existingPatient = yield patient_model_1.PatientModel.findOne({ email: this.email });
            if (existingPatient) {
                throw new AppErrors_1.default(409, "This Patient is already registered");
            }
        }
        if (this.isModified("password")) {
            this.password = yield bcrypt_1.default.hash(this.password, 10);
        }
        next();
    });
});
exports.DoctorModel = (0, mongoose_1.model)("Doctor", doctorSchema);
