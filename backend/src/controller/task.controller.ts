import expressAsyncHandler from "express-async-handler";
import { Response } from "express";
import { addTaskService, deleteTaskService, getTasksService, updateTaskService } from "../service";
import { IAddTask, ITaskResponse, IRequest } from "../interface";

export const taskController = {

   addTask: expressAsyncHandler(async (req: IRequest<IAddTask, any, any>, res: Response<ITaskResponse>) => {
      const task = await addTaskService(req.userId, req.body);
      res.status(201).json(task);
   }),

   deleteTask: expressAsyncHandler(async (req: IRequest<any, { taskId: string }, any>, res: Response<{ message: string }>) => {
      await deleteTaskService(req.params.taskId);
      res.json({ message: "Success" });
   }),

   updateTaskStatus: expressAsyncHandler(async (req: IRequest<{ isCompleted: string }, { taskId: string }, any>, res: Response<{ message: string }>) => {
      await updateTaskService(req.params.taskId, req.body);
      res.json({ message: "Success" });
   }),

   getAllTasks: expressAsyncHandler(async (req: IRequest<{ planId: string }, any, any>, res: Response<Partial<ITaskResponse>[]>) => {
      const tasks = await getTasksService(req.userId, req.body.planId);
      res.json(tasks);
   }),

};