"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorRouter = void 0;
const express_1 = require("express");
const doctor_controller_1 = require("./doctor.controller");
const router = (0, express_1.Router)();
router.get("/", doctor_controller_1.doctorController.getAllDoctor);
router.get("/:id", doctor_controller_1.doctorController.getDoctorProfile);
exports.doctorRouter = router;
