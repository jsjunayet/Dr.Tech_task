import { Router } from "express";
import { validation } from "../../middleware/validation";
import { doctorRegistervalidation } from "../doctor/doctor.validation";
import { patientRegisterValidation } from "../patient/patient.validation";
import { AllAuthController } from "./auth.controller";
import { authvalidationAll } from "./auth.validation";

const router = Router();
router.post(
  "/register-doctor",
  validation(doctorRegistervalidation),
  AllAuthController.doctorRegister
);
router.post(
  "/register-patient",
  validation(patientRegisterValidation),
  AllAuthController.patientRegister
);
router.post(
  "/login",
  validation(authvalidationAll.authLoginvalidation),
  AllAuthController.authLogin
);

export const authRouter = router;
