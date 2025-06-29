import { Router } from "express";
import { authorizeRole } from "../../middleware/verifyToken";
const router = Router();

router.post(
  "/",
  authorizeRole(["doctor"]),
  validateRequest(createServiceZodSchema),
  createServiceHandler
);

router.get("/", authorizeRole(["doctor"]), getDoctorServicesHandler);

router.patch(
  "/:id",
  authorizeRole(["doctor"]),
  validateRequest(updateServiceZodSchema),
  updateServiceHandler
);

router.delete("/:id", authorizeRole(["doctor"]), deleteServiceHandler);

export default router;
