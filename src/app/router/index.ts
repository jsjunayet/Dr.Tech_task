import { Router } from "express";
import { AppointmentServiceRouter } from "../moduler/appointment/appointment.route";
import { authRouter } from "../moduler/auth/auth.route";
import { availabilityServiceRouter } from "../moduler/availability/availability.route";
import { doctorRouter } from "../moduler/doctor/doctor.route";
import { patientRouter } from "../moduler/patient/patient.route";
import { doctorServiceRouter } from "../moduler/service/service.route";

const router = Router();
const allRouter = [
  {
    path: "/auth",
    route: authRouter,
  },
  {
    path: "/doctor/services",
    route: doctorServiceRouter,
  },
  {
    path: "/doctor",
    route: availabilityServiceRouter,
  },
  {
    path: "/doctors",
    route: doctorRouter,
  },
  {
    path: "/appointments",
    route: AppointmentServiceRouter,
  },
  {
    path: "/patient",
    route: patientRouter,
  },
];
allRouter.forEach((route) => router.use(route.path, route.route));
export default router;
