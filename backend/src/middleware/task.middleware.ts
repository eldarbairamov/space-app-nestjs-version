import expressAsyncHandler from "express-async-handler";
import { type NextFunction, type Response } from "express";
import { type RequestWithParams } from "../interface";
import { ApiException } from "../error/api.expception";
import { TaskRepository } from "../repository";
import { Types } from "mongoose";

export const taskMiddleware = {

   isTaskExists: expressAsyncHandler(async (req: RequestWithParams<{ taskId: string }>, res: Response, next: NextFunction) => {
      const taskId = req.params.taskId;
      if (!taskId) throw ApiException.BadRequest();

      const isTaskExist = await TaskRepository.findById(taskId);
      if (!isTaskExist) throw ApiException.NotFound();

      next();
   }),

   isObjectIdValid: expressAsyncHandler(async (req: RequestWithParams<{ taskId: string }>, res: Response, next: NextFunction) => {
      const taskId = req.params.taskId;

      if (!Types.ObjectId.isValid(taskId)) throw ApiException.ObjectID();

      next();
   }),

};