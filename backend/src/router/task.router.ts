import { Router } from "express";
import { authMiddleware } from "../middleware";
import { taskController } from "../controller/task.controller";

export const taskRouter = Router();

taskRouter.get("", authMiddleware.isAccessTokenValid, taskController.getAllTasks);
taskRouter.post("", authMiddleware.isAccessTokenValid, taskController.addTask);
taskRouter.patch("", authMiddleware.isAccessTokenValid, taskController.updateTaskStatus);
taskRouter.delete("", authMiddleware.isAccessTokenValid, taskController.deleteTask);