import { Router } from "express";
import { authorizeRole } from "../../middleware/verifyToken";
import { AppointmentContoller } from "../appointment/appoinment.controller";

const router = Router();
router.get(
  "/appointments",
  authorizeRole(["patient"]),
  AppointmentContoller.GetPatientAppointment
);
export const patientRouter = router;
