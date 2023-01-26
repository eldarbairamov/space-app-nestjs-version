import { Router } from "express";
import { authMiddleware, commonMiddleware } from "../middleware";
import { taskController } from "../controller";
import { taskMiddleware } from "../middleware";

export const taskRouter = Router();

taskRouter.get(
   "/",
   authMiddleware.isAccessTokenValid,
   taskController.getAllTasks,
);

taskRouter.post(
   "/add",
   authMiddleware.isAccessTokenValid,
   commonMiddleware.isRequestEmpty,
   taskController.addTask,
);

taskRouter.patch(
   "/:taskId",
   authMiddleware.isAccessTokenValid,
   taskMiddleware.isObjectIdValid,
   taskMiddleware.isTaskExists,
   commonMiddleware.isRequestEmpty,
   taskController.updateTaskStatus,
);

taskRouter.delete(
   "/:taskId",
   authMiddleware.isAccessTokenValid,
   taskMiddleware.isObjectIdValid,
   taskMiddleware.isTaskExists,
   taskController.deleteTask);