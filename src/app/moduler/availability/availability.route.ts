import { Router } from "express";
import { authorizeRole } from "../../middleware/verifyToken";
import { availabilityContoller } from "./availability.controller";

const router = Router();

router.post(
  "/availability",
  authorizeRole(["doctor"]),
  availabilityContoller.createAvailability
);

router.get(
  "/appointments",
  authorizeRole(["doctor"]),
  availabilityContoller.getDoctorAppointments
);
router.patch(
  "/appointments/:id/status",
  authorizeRole(["doctor"]),
  availabilityContoller.updatedDoctorAppointments
);

export const availabilityServiceRouter = router;
