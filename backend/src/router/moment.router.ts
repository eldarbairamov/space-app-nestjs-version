import { Router } from "express";
import { momentController } from "../controller";

export const momentRouter = Router();

momentRouter.use("/", momentController.getMoments);
momentRouter.use("/add", momentController.addMoment);
momentRouter.use("/count", momentController.getMomentsCount);
momentRouter.use("/filter", momentController.getMomentsByTags);
momentRouter.use("/:momentId", momentController.updateMoment);
momentRouter.use("/:momentId", momentController.deleteMoment);
