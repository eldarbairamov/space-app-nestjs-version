import { Router } from "express";
import { authController } from "../controller/auth.controller";
import { authMiddleware } from "../middleware";

export const authRouter = Router();

authRouter.post(
   "/registration",
   authMiddleware.isRequestEmpty,
   authMiddleware.isRequestValid,
   authMiddleware.isEmailUnique,
   authController.registration);

authRouter.post(
   "/login",
   authMiddleware.isRequestEmpty,
   authMiddleware.isUserExists,
   authMiddleware.isRequestValid,
   authController.login,
);

authRouter.post(
   "/activation",
   authController.activation,
);

authRouter.post(
   "/password_forgot",
   authMiddleware.isUserExists,
   authController.forgotPassword,
);

authRouter.post(
   "/password_reset",
   authController.resetPassword,
);

authRouter.get(
   "/logout",
   authMiddleware.isAccessTokenValid,
   authController.logout,
);