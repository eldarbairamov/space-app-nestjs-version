import expressAsyncHandler from "express-async-handler";
import { type Response } from "express";
import { addTaskService } from "../service/task-service/add-task.service";
import {
   type ITaskDto,
   type RequestWithBodyAndCustomVar, RequestWithBodyAndParams,
   type RequestWithCustomVar,
   type RequestWithParams,
} from "../interface";
import { getTasksService } from "../service/task-service/get-tasks.service";
import { TaskRepository } from "../repository";

export const taskController = {

   addTask: expressAsyncHandler(async (req: RequestWithBodyAndCustomVar<ITaskDto>, res: Response<Partial<ITaskDto>>) => {
      const task = await addTaskService(req.userId!, req.body.planId, req.body.title);
      res.json(task);
   }),

   deleteTask: expressAsyncHandler(async (req: RequestWithParams<{ taskId: string }>, res: Response<{ message: string }>) => {
      await TaskRepository.deleteById(req.params.taskId);
      res.json({ message: "Успішно" });
   }),

   updateTaskStatus: expressAsyncHandler(async (req: RequestWithBodyAndParams<ITaskDto, { taskId: string }>, res: Response<{ message: string }>) => {
      await TaskRepository.updateById(req.params.taskId, { isCompleted: req.body.isCompleted });
      res.json({ message: "Успішно" });
   }),

   getAllTasks: expressAsyncHandler(async (req: RequestWithCustomVar, res: Response<Partial<ITaskDto>[]>) => {
      const tasks = await getTasksService(req.userId!);
      res.json(tasks);
   }),

};