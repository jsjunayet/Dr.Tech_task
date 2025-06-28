import { Router } from "express";
import { authRouter } from "../moduler/auth/auth.route";

const router = Router();
const allRouter = [
  {
    path: "/auth",
    route: authRouter,
  },
];
allRouter.forEach((route) => router.use(route.path, route.route));
export default router;
