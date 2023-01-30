import { Router } from "express";
import { authController } from "../controller";
import { authMiddleware, commonMiddleware } from "../middleware";

export const authRouter = Router();

// Registration
authRouter.post(
   "/registration",
   commonMiddleware.isRequestEmpty,
   authMiddleware.isRequestValid,
   authMiddleware.isEmailUnique,
   authController.registration);

// Login
authRouter.post(
   "/login",
   commonMiddleware.isRequestEmpty,
   authMiddleware.isUserExists,
   authMiddleware.isRequestValid,
   authController.login,
);

// Account activation
authRouter.post(
   "/activation",
   authController.activation,
);

// Forgot password
authRouter.post(
   "/password_forgot",
   authMiddleware.isUserExists,
   authController.forgotPassword,
);

// Reset password
authRouter.post(
   "/password_reset",
   authController.resetPassword,
);


// Logout
authRouter.get(
   "/logout",
   authMiddleware.isAccessTokenValid,
   authController.logout,
);