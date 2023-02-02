import expressAsyncHandler from "express-async-handler";
import { type RequestWithParam } from "../interface";
import { type NextFunction, type Response } from "express";
import { ApiException } from "../error/api.expception";
import { PlanRepository } from "../repository";
import { Types } from "mongoose";

export const planMiddleware = {

   isPlanExists: expressAsyncHandler(async (req: RequestWithParam<{ planId: string }>, res: Response, next: NextFunction) => {
      const planId = req.params.planId;
      if (!planId) throw ApiException.BadRequest();

      const isPlanExist = await PlanRepository.findById(planId);
      if (!isPlanExist) throw ApiException.NotFound();

      next();
   }),

   isObjectIdValid: expressAsyncHandler(async (req: RequestWithParam<{ planId: string }>, res: Response, next: NextFunction) => {
      const planId = req.params.planId;

      if (!Types.ObjectId.isValid(planId)) throw ApiException.ObjectID();

      next()
   }),

};