import expressAsyncHandler from "express-async-handler";
import { type Response } from "express";
import { addTaskService, getTasksService } from "../service";
import {
   type ITaskDto,
   type RequestWithBodyAndCustomVar, type RequestWithBodyAndParams,
   type RequestWithParams,
} from "../interface";
import { TaskRepository } from "../repository";

export const taskController = {

   addTask: expressAsyncHandler(async (req: RequestWithBodyAndCustomVar<ITaskDto>, res: Response<Partial<ITaskDto>>) => {
      const taskDto = await addTaskService(req.userId!, req.body.planId, req.body.title);
      res.json(taskDto);
   }),

   deleteTask: expressAsyncHandler(async (req: RequestWithParams<{ taskId: string }>, res: Response<{ message: string }>) => {
      await TaskRepository.findByIdAndDelete(req.params.taskId);
      res.json({ message: "Успішно" });
   }),

   updateTaskStatus: expressAsyncHandler(async (req: RequestWithBodyAndParams<ITaskDto, { taskId: string }>, res: Response<{ message: string }>) => {
      await TaskRepository.findByIdAndUpdate(req.params.taskId, { isCompleted: req.body.isCompleted });
      res.json({ message: "Успішно" });
   }),

   getAllTasks: expressAsyncHandler(async (req: RequestWithBodyAndCustomVar<{ planId: string }>, res: Response<Partial<ITaskDto>[]>) => {
      const tasksDto = await getTasksService(req.userId!, req.body.planId);
      res.json(tasksDto);
   }),

};