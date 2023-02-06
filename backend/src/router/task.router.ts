import { Router } from "express";
import { taskController } from "../controller";
import { authMiddleware, commonMiddleware } from "../middleware";

export const taskRouter = Router();

// Get all tacks
taskRouter.post(
   "/",
   authMiddleware.isAccessExists,
   taskController.getAllTasks,
);

// Add task
taskRouter.post(
   "/add",
   authMiddleware.isAccessExists,
   commonMiddleware.isRequestEmpty,
   taskController.addTask,
);

// Update task status
taskRouter.patch(
   "/:taskId",
   authMiddleware.isAccessExists,
   commonMiddleware.isObjectExists("task"),
   taskController.updateTaskStatus,
);

// Send Plan ID and delete task
taskRouter.post(
   "/:taskId",
   authMiddleware.isAccessExists,
   commonMiddleware.isObjectExists("task"),
   taskController.deleteTask,
);