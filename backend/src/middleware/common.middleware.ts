import expressAsyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import { ApiError } from "../error/Api.error";

export const commonMiddleware = {

   isRequestEmpty: expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      if (!Object.entries(req.body).length) throw new ApiError("Запит пустий", 400);
      next();
   }),

}