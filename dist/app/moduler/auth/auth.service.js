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
exports.AllAuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppErrors_1 = __importDefault(require("../../error/AppErrors"));
const doctor_model_1 = require("../doctor/doctor.model");
const patient_model_1 = require("../patient/patient.model");
dotenv_1.default.config();
const doctorRegisterService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield doctor_model_1.DoctorModel.create(payload);
    return {
        name: result.name,
        email: result.email,
    };
});
const patientRegisterService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield patient_model_1.PatientModel.create(payload);
    return {
        name: result.name,
        email: result.email,
    };
});
const authLoginService = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield doctor_model_1.DoctorModel.findOne({ email });
    let role = "doctor";
    if (!user) {
        user = yield patient_model_1.PatientModel.findOne({ email });
        role = "patient";
    }
    if (!user) {
        throw new AppErrors_1.default(404, "User is Not Found");
    }
    const matchPassword = yield bcryptjs_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
    if (!matchPassword) {
        throw new AppErrors_1.default(409, "Invalid credentials");
    }
    const accessToken = jsonwebtoken_1.default.sign({ userID: user === null || user === void 0 ? void 0 : user._id, role }, process.env.JWT_SECRET, { expiresIn: "1d" });
    return { accessToken };
});
exports.AllAuthService = {
    authLoginService,
    doctorRegisterService,
    patientRegisterService,
};
