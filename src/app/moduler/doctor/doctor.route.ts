import { Router } from "express";
import { doctorController } from "./doctor.controller";

const router = Router();
router.get("/", doctorController.getAllDoctor);
router.get("/:id", doctorController.getDoctorProfile);

export const doctorRouter = router;
