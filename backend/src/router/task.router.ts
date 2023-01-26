import { Router } from "express";
import { authMiddleware, commonMiddleware } from "../middleware";
import { taskController } from "../controller";

export const taskRouter = Router();

taskRouter.get("/", authMiddleware.isAccessTokenValid, taskController.getAllTasks);
taskRouter.post("/add", authMiddleware.isAccessTokenValid, commonMiddleware.isRequestEmpty, taskController.addTask);
taskRouter.patch("/:taskId", authMiddleware.isAccessTokenValid, commonMiddleware.isRequestEmpty, taskController.updateTaskStatus);
taskRouter.delete("/:taskId", authMiddleware.isAccessTokenValid, taskController.deleteTask);