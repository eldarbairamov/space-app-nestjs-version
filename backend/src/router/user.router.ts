import { Router } from "express";
import { userController } from "../controller";
import { userMiddleware, authMiddleware, commonMiddleware } from "../middleware";
import { fileMiddleware } from "../middleware/file.middleware";

export const userRouter = Router();

// Get user info
userRouter.get(
   "/get_user",
   authMiddleware.isAccessTokenValid,
   userController.getUser,
);

// Update user profile
userRouter.patch(
   "/profile_update",
   authMiddleware.isAccessTokenValid,
   commonMiddleware.isRequestValid("user"),
   userMiddleware.isChangesSame,
   userController.profileUpdate,
);

// Change email: request
userRouter.post(
   "/email_change",
   authMiddleware.isAccessTokenValid,
   commonMiddleware.isRequestEmpty,
   userMiddleware.isEmailValid,
   authMiddleware.isEmailUnique,
   userController.changeEmailRequest,
);

// Change email: accept
userRouter.patch(
   "/email_new",
   userController.changeEmail,
);

// Change password: request
userRouter.patch(
   "/password_new",
   authMiddleware.isAccessTokenValid,
   userController.changePassword,
);

// Upload avatar
userRouter.patch(
   "/avatar_upload",
   authMiddleware.isAccessTokenValid,
   fileMiddleware.imageChecker,
   userController.uploadAvatar,
);

// Send image name and delete avatar
userRouter.patch(
   "/avatar_delete",
   authMiddleware.isAccessTokenValid,
   userController.deleteAvatar,
);