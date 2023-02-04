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
   taskMiddleware.isIdValid,
   taskMiddleware.isTaskExists,
   commonMiddleware.isRequestEmpty,
   taskController.updateTaskStatus,
);

// Send Plan ID and delete task
taskRouter.post(
   "/:taskId",
   authMiddleware.isAccessTokenValid,
   taskMiddleware.isIdValid,
   taskMiddleware.isTaskExists,
   taskController.deleteTask
);