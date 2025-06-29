import { Router } from "express";
import { authorizeRole } from "../../middleware/verifyToken";
import { AppointmentContoller } from "./appoinment.controller";

const router = Router();

router.post(
  "/",
  authorizeRole(["patient"]),
  AppointmentContoller.createAppointment
);
export const AppointmentServiceRouter = router;
