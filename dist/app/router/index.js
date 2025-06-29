"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appointment_route_1 = require("../moduler/appointment/appointment.route");
const auth_route_1 = require("../moduler/auth/auth.route");
const availability_route_1 = require("../moduler/availability/availability.route");
const doctor_route_1 = require("../moduler/doctor/doctor.route");
const patient_route_1 = require("../moduler/patient/patient.route");
const service_route_1 = require("../moduler/service/service.route");
const router = (0, express_1.Router)();
const allRouter = [
    {
        path: "/auth",
        route: auth_route_1.authRouter,
    },
    {
        path: "/doctor/services",
        route: service_route_1.doctorServiceRouter,
    },
    {
        path: "/doctor",
        route: availability_route_1.availabilityServiceRouter,
    },
    {
        path: "/doctors",
        route: doctor_route_1.doctorRouter,
    },
    {
        path: "/appointments",
        route: appointment_route_1.AppointmentServiceRouter,
    },
    {
        path: "/patient",
        route: patient_route_1.patientRouter,
    },
];
allRouter.forEach((route) => router.use(route.path, route.route));
exports.default = router;
