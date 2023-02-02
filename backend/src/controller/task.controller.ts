import expressAsyncHandler from "express-async-handler";
import { type Response } from "express";
import { addTaskService, getTasksService } from "../service";
import {
   type RequestWithBodyAndVar, type RequestWithBodyAndParam,
   type RequestWithParam,
} from "../interface";
import { TaskRepository } from "../repository";
import { TaskDto } from "../dto/task.dto";

export const taskController = {

   addTask: expressAsyncHandler(async (req: RequestWithBodyAndVar<TaskDto>, res: Response<Partial<TaskDto>>) => {
      const taskDto = await addTaskService(req.userId!, req.body.planId, req.body.title);
      res.json(taskDto);
   }),

   deleteTask: expressAsyncHandler(async (req: RequestWithParam<{ taskId: string }>, res: Response<{ message: string }>) => {
      await TaskRepository.findByIdAndDelete(req.params.taskId);
      res.json({ message: "Успішно" });
   }),

   updateTaskStatus: expressAsyncHandler(async (req: RequestWithBodyAndParam<TaskDto, { taskId: string }>, res: Response<{ message: string }>) => {
      await TaskRepository.findByIdAndUpdate(req.params.taskId, { isCompleted: req.body.isCompleted });
      res.json({ message: "Успішно" });
   }),

   getAllTasks: expressAsyncHandler(async (req: RequestWithBodyAndVar<{ planId: string }>, res: Response<Partial<TaskDto>[]>) => {
      const tasksDto = await getTasksService(req.userId!, req.body.planId);
      res.json(tasksDto);
   }),

};