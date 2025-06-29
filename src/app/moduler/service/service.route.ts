import { Router } from "express";
import { validation } from "../../middleware/validation";
import { authorizeRole } from "../../middleware/verifyToken";
import { serviceController } from "./service.controller";
import {
  serviceUpdateValidation,
  serviceValidation,
} from "./service.validation";
const router = Router();

router.post(
  "/",
  authorizeRole(["doctor"]),
  validation(serviceValidation),
  serviceController.createService
);

router.get("/", authorizeRole(["doctor"]), serviceController.getDoctorService);

router.patch(
  "/:id",
  authorizeRole(["doctor"]),
  validation(serviceUpdateValidation),
  serviceController.UpdateService
);

router.delete(
  "/:id",
  authorizeRole(["doctor"]),
  serviceController.deletedService
);

export const doctorServiceRouter = router;
