import expressAsyncHandler from "express-async-handler";
import { type RequestWithParams } from "../interface";
import { type NextFunction, type Response } from "express";
import { ApiError } from "../error/Api.error";
import { PlanRepository } from "../repository";
import { Types } from "mongoose";

export const planMiddleware = {

   isPlanExists: expressAsyncHandler(async (req: RequestWithParams<{ planId: string }>, res: Response, next: NextFunction) => {
      const planId = req.params.planId;
      if (!planId) throw ApiError.BadRequest();

      const isPlanExist = await PlanRepository.findById(planId);
      if (!isPlanExist) throw ApiError.NotFound();

      next();
   }),

   isObjectIdValid: expressAsyncHandler(async (req: RequestWithParams<{ planId: string }>, res: Response, next: NextFunction) => {
      const planId = req.params.planId;

      if (!Types.ObjectId.isValid(planId)) throw ApiError.ObjectID();

      next()
   }),

};