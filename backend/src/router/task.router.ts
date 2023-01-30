import { Router } from "express";
import { authMiddleware, commonMiddleware } from "../middleware";
import { taskController } from "../controller";
import { taskMiddleware } from "../middleware";

export const taskRouter = Router();

// Get all tacks
taskRouter.post(
   "/",
   authMiddleware.isAccessTokenValid,
   taskController.getAllTasks,
);

// Add task
taskRouter.post(
   "/add",
   authMiddleware.isAccessTokenValid,
   commonMiddleware.isRequestEmpty,
   taskController.addTask,
);

// Update task status
taskRouter.patch(
   "/:taskId",
   authMiddleware.isAccessTokenValid,
   taskMiddleware.isObjectIdValid,
   taskMiddleware.isTaskExists,
   commonMiddleware.isRequestEmpty,
   taskController.updateTaskStatus,
);

// Delete task
taskRouter.delete(
   "/:taskId",
   authMiddleware.isAccessTokenValid,
   taskMiddleware.isObjectIdValid,
   taskMiddleware.isTaskExists,
   taskController.deleteTask);