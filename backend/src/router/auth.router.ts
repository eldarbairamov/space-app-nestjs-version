import { Router } from "express";
import { authController } from "../controller";
import { authMiddleware, commonMiddleware, isAccessExists, isRequestValid } from "../middleware";

export const authRouter = Router();

// Registration
authRouter.post(
   "/registration",
   isRequestValid("registration"),
   authMiddleware.isEmailUnique,
   authController.registration,
);

// Login
authRouter.post(
   "/login",
   isRequestValid("login"),
   authMiddleware.isUserExists,
   authController.login,
);

// Account activation
authRouter.post(
   "/activation",
   commonMiddleware.isRequestEmpty,
   authController.activation,
);

// Forgot password
authRouter.post(
   "/password_forgot",
   commonMiddleware.isRequestEmpty,
   authMiddleware.isUserExists,
   authController.forgotPassword,
);

// Reset password
authRouter.patch(
   "/password_reset",
   isRequestValid("reset_password"),
   authController.resetPassword,
);

// Logout
authRouter.get(
   "/logout",
   isAccessExists,
   authController.logout,
);