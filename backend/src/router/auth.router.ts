import { Router } from "express";
import { authController } from "../controller";
import { authMiddleware, commonMiddleware } from "../middleware";

export const authRouter = Router();

// Registration
authRouter.post(
   "/registration",
   commonMiddleware.isRequestEmpty,
   commonMiddleware.isRequestValid('auth'),
   authMiddleware.isEmailUnique,
   authController.registration
);

// Login
authRouter.post(
   "/login",
   commonMiddleware.isRequestEmpty,
   authMiddleware.isUserExists,
   commonMiddleware.isRequestValid('auth'),
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
authRouter.patch(
   "/password_reset",
   authController.resetPassword,
);


// Logout
authRouter.get(
   "/logout",
   authMiddleware.isAccessTokenValid,
   authController.logout,
);