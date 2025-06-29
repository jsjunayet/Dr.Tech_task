"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentServiceRouter = void 0;
const express_1 = require("express");
const verifyToken_1 = require("../../middleware/verifyToken");
const appoinment_controller_1 = require("./appoinment.controller");
const router = (0, express_1.Router)();
router.post("/", (0, verifyToken_1.authorizeRole)(["patient"]), appoinment_controller_1.AppointmentContoller.createAppointment);
exports.AppointmentServiceRouter = router;
