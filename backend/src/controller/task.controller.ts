import expressAsyncHandler from "express-async-handler";
import { type Response } from "express";
import { addTaskService, getTasksService } from "../service";
import {
   type RequestWithBodyAndVar, type RequestWithBodyAndParam,
} from "../interface";
import { TaskRepository } from "../repository";
import { AddTaskDto, TaskResponseDto } from "../dto";
import { deleteTaskService } from "../service/task-service/delete-task.service";

export const taskController = {

   addTask: expressAsyncHandler(async (req: RequestWithBodyAndVar<AddTaskDto>, res: Response<TaskResponseDto>) => {
      const taskDto = await addTaskService(req.userId!, req.body.planId, req.body.title);
      res.json(taskDto);
   }),

   deleteTask: expressAsyncHandler(async (req: RequestWithBodyAndParam<{ planId: string }, { taskId: string }>, res: Response<{ message: string }>) => {
      await deleteTaskService(req.params.taskId, req.body.planId);
      res.json({ message: "Успішно" });
   }),

   updateTaskStatus: expressAsyncHandler(async (req: RequestWithBodyAndParam<{ isCompleted: string }, { taskId: string }>, res: Response<{ message: string }>) => {
      await TaskRepository.findByIdAndUpdate(req.params.taskId, { isCompleted: req.body.isCompleted });
      res.json({ message: "Успішно" });
   }),

   getAllTasks: expressAsyncHandler(async (req: RequestWithBodyAndVar<{ planId: string }>, res: Response<Partial<TaskResponseDto>[]>) => {
      const tasksDto = await getTasksService(req.userId!, req.body.planId);
      res.json(tasksDto);
   }),

};