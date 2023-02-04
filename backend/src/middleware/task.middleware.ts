import expressAsyncHandler from "express-async-handler";
import { type NextFunction, type Response } from "express";
import { type RequestWithParam } from "../interface";
import { ApiException } from "../exception/api.exception";
import { TaskRepository } from "../repository";
import { Types } from "mongoose";

export const taskMiddleware = {

   isTaskExists: expressAsyncHandler(async (req: RequestWithParam<{ taskId: string }>, res: Response, next: NextFunction) => {
      const taskId = req.params.taskId;
      if (!taskId) throw ApiException.BadRequest();

      const isTaskExist = await TaskRepository.findById(taskId);
      if (!isTaskExist) throw ApiException.NotFound();

      next();
   }),

   isIdValid: expressAsyncHandler(async (req: RequestWithParam<{ taskId: string }>, res: Response, next: NextFunction) => {
      const taskId = req.params.taskId;

      if (!Types.ObjectId.isValid(taskId)) throw ApiException.ObjectID();

      next();
   }),

};