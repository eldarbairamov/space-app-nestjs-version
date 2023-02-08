import expressAsyncHandler from "express-async-handler";
import { Response } from "express";
import { addTaskService, deleteTaskService, getTasksService, updateTaskService } from "../service";
import { IAddTask, ITaskResponse, IUpdateTask, RequestWithBodyAndParam, RequestWithBodyAndVar } from "../interface";

export const taskController = {

   addTask: expressAsyncHandler(async (req: RequestWithBodyAndVar<IAddTask>, res: Response<ITaskResponse>) => {
      const task = await addTaskService(req.userId!, req.body);
      res.json(task);
   }),

   deleteTask: expressAsyncHandler(async (req: RequestWithBodyAndParam<{ planId: string }, { taskId: string }>, res: Response<{ message: string }>) => {
      await deleteTaskService(req.params.taskId, req.body.planId);
      res.json({ message: "Success" });
   }),

   updateTaskStatus: expressAsyncHandler(async (req: RequestWithBodyAndParam<IUpdateTask, { taskId: string }>, res: Response<{ message: string }>) => {
      await updateTaskService(req.params.taskId, req.body);
      res.json({ message: "Success" });
   }),

   getAllTasks: expressAsyncHandler(async (req: RequestWithBodyAndVar<{ planId: string }>, res: Response<Partial<ITaskResponse>[]>) => {
      const tasks = await getTasksService(req.userId!, req.body.planId);
      res.json(tasks);
   }),

};