import expressAsyncHandler from "express-async-handler";
import { type NextFunction, type Request, type Response } from "express";
import { ApiException } from "../exception/api.exception";

export const commonMiddleware = {

   isRequestEmpty: expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      if (!Object.entries(req.body).length) throw new ApiException("Запит пустий", 400);
      next();
   }),

}