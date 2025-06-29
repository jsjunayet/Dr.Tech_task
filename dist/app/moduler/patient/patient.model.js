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
exports.PatientModel = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mongoose_1 = require("mongoose");
const AppErrors_1 = __importDefault(require("../../error/AppErrors"));
const doctor_model_1 = require("../doctor/doctor.model");
const patientSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        required: true,
    },
    role: { type: String, default: "patient" },
}, {
    timestamps: true,
});
patientSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isNew) {
            const existingDoctor = yield doctor_model_1.DoctorModel.findOne({ email: this.email });
            if (existingDoctor) {
                throw new AppErrors_1.default(409, "This Doctor is already registered");
            }
            const existingPatient = yield exports.PatientModel.findOne({ email: this.email });
            if (existingPatient) {
                throw new AppErrors_1.default(409, "This Patient is already registered");
            }
        }
        if (this.isModified("password")) {
            this.password = yield bcryptjs_1.default.hash(this.password, 10);
        }
        next();
    });
});
exports.PatientModel = (0, mongoose_1.model)("Patient", patientSchema);
