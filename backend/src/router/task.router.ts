import { Router } from "express";
import { taskController } from "../controller";
import { isAccessExists, isObjectExists, isRequestValid } from "../middleware";

export const taskRouter = Router();

// Get all tacks
taskRouter.post(
   "/", isAccessExists, taskController.getAllTasks,
);

// Add task
taskRouter.post(
   "/add", isAccessExists, isRequestValid("add_task"), taskController.addTask,
);

// Update task status
taskRouter.patch(
   "/:taskId", isAccessExists, isObjectExists, isRequestValid("update_task_status"), taskController.updateTaskStatus,
);

// Send Plan ID and delete task
taskRouter.post(
   "/:taskId", isAccessExists, isObjectExists("task"), taskController.deleteTask,
);