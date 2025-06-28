import { Router } from "express";
import { validation } from "../../middleware/validation";
import { AllAuthController } from "./auth.controller";
import { authvalidationAll } from "./auth.validation";

const router = Router();
router.post(
  "/login",
  validation(authvalidationAll.authLoginvalidation),
  AllAuthController.authLogin
);

export const authRouter = router;
