import { Router } from "express";
import { userController } from "../controller";
import {
   userMiddleware,
   authMiddleware,
   commonMiddleware,
   isRequestValid,
   fileMiddleware,
   isAccessExists,
} from "../middleware";

export const userRouter = Router();

// Get user info
userRouter.get(
   "/get_user",
   isAccessExists,
   userController.getUser,
);

// Update user profile
userRouter.patch(
   "/profile_update",
   isAccessExists,
   isRequestValid("update_profile"),
   userMiddleware.isChangesSame,
   userController.updateProfile,
);

// Change email: request
userRouter.post(
   "/email_change",
   isAccessExists,
   isRequestValid("change_email"),
   authMiddleware.isEmailUnique,
   userController.changeEmailRequest,
);

// Change email: accept
userRouter.patch(
   "/email_new",
   commonMiddleware.isRequestEmpty,
   userController.changeEmail,
);

// Change password: request
userRouter.patch(
   "/password_new",
   isAccessExists,
   isRequestValid("change_password"),
   userController.changePassword,
);

// Upload avatar
userRouter.patch(
   "/avatar_upload",
   isAccessExists,
   fileMiddleware.imageChecker,
   userController.uploadAvatar,
);

// Send image name and delete avatar
userRouter.patch(
   "/avatar_delete",
   isAccessExists,
   isRequestValid("image_name"),
   userController.deleteAvatar,
);