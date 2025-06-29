import { Router } from "express";
import { authorizeRole } from "../../middleware/verifyToken";
import { availabilityContoller } from "./availability.controller";

const router = Router();

router.post(
  "/",
  authorizeRole(["doctor"]),
  availabilityContoller.createAvailability
);

// router.get("/", authorizeRole(["doctor"]), serviceController.getDoctorService);

// router.patch(
//   "/:id",
//   authorizeRole(["doctor"]),
//   validation(serviceUpdateValidation),
//   serviceController.UpdateService
// );

// router.delete(
//   "/:id",
//   authorizeRole(["doctor"]),
//   serviceController.deletedService
// );

export const availabilityServiceRouter = router;
