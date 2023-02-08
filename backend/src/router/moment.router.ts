import { Router } from "express";
import { momentController } from "../controller";
import { authMiddleware, commonMiddleware, fileMiddleware } from "../middleware";

export const momentRouter = Router();

momentRouter.get(
   "/",
   authMiddleware.isAccessExists,
   momentController.getMoments);

momentRouter.get(
   "/add",
   authMiddleware.isAccessExists,
   momentController.addMoment);

momentRouter.get(
   "/count",
   authMiddleware.isAccessExists,
   momentController.getMomentsCount);

momentRouter.get(
   "/filter",
   authMiddleware.isAccessExists,
   momentController.getMomentsByTags);

momentRouter.get(
   "/:momentId",
   authMiddleware.isAccessExists,
   momentController.getOneMoment,
);

momentRouter.patch(
   "/:momentId",
   authMiddleware.isAccessExists,
   commonMiddleware.isRequestEmpty,
   commonMiddleware.isObjectExists("moment"),
   momentController.updateMoment);

momentRouter.patch(
   "/:momentId/photo_upload",
   authMiddleware.isAccessExists,
   fileMiddleware.imageChecker,
   momentController.uploadPhoto);

momentRouter.post(
   "/:momentId/photo_delete",
   authMiddleware.isAccessExists,
   commonMiddleware.isRequestEmpty,
   momentController.deletePhoto);

momentRouter.delete(
   "/:momentId",
   authMiddleware.isAccessExists,
   commonMiddleware.isObjectExists("moment"),
   momentController.deleteMoment);

