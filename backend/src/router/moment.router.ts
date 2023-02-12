import { Router } from "express";
import { momentController } from "../controller";
import { authMiddleware, commonMiddleware, fileMiddleware } from "../middleware";

export const momentRouter = Router();

// Get all moments
momentRouter.get(
   "/",
   authMiddleware.isAccessExists,
   momentController.getMoments);

// Add moment
momentRouter.get(
   "/add",
   authMiddleware.isAccessExists,
   momentController.addMoment);

// Get count
momentRouter.get(
   "/count",
   authMiddleware.isAccessExists,
   momentController.getMomentsCount);

// Get one moment
momentRouter.get(
   "/:momentId",
   authMiddleware.isAccessExists,
   momentController.getOneMoment,
);

// Update moment
momentRouter.patch(
   "/:momentId",
   authMiddleware.isAccessExists,
   commonMiddleware.isRequestEmpty,
   commonMiddleware.isObjectExists("moment"),
   momentController.updateMoment);

// Upload photo
momentRouter.patch(
   "/:momentId/photo_upload",
   authMiddleware.isAccessExists,
   fileMiddleware.imageChecker,
   momentController.uploadPhoto);

// Delete photo
momentRouter.post(
   "/:momentId/photo_delete",
   authMiddleware.isAccessExists,
   commonMiddleware.isRequestEmpty,
   momentController.deletePhoto);

// Delete moment
momentRouter.delete(
   "/:momentId",
   authMiddleware.isAccessExists,
   commonMiddleware.isObjectExists("moment"),
   momentController.deleteMoment);

