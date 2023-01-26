import { Router } from "express";
import { userController } from "../controller";
import { userMiddleware, authMiddleware, commonMiddleware } from "../middleware";

export const userRouter = Router();

userRouter.get(
   "/get_info",
   authMiddleware.isAccessTokenValid,
   userController.getUserInfo,
);

userRouter.patch(
   "/profile_update",
   authMiddleware.isAccessTokenValid,
   userMiddleware.isRequestValid,
   userMiddleware.isChangesSame,
   userController.profileUpdate,
);

userRouter.post(
   "/email_change",
   authMiddleware.isAccessTokenValid,
   commonMiddleware.isRequestEmpty,
   userMiddleware.isEmailValid,
   authMiddleware.isEmailUnique,
   userController.emailUpdate,
);

userRouter.patch(
   "/email_reset",
   authMiddleware.isAccessTokenValid,
   userController.changeEmail,
);

userRouter.patch(
   "/password_change",
   authMiddleware.isAccessTokenValid,
   userController.changePassword,
);