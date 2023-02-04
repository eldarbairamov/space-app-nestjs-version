import expressAsyncHandler from "express-async-handler";
import { type NextFunction, type Request, type Response } from "express";
import { ApiException } from "../exception/api.exception";
import { authValidator, noteValidator, updateProfileValidator } from "../validator";

export const commonMiddleware = {

   isRequestEmpty: expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      if (!Object.entries(req.body).length) throw new ApiException("Запит пустий.", 400);
      next();
   }),

   isRequestValid: (subject: string) => expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {

      if (subject === 'auth') {
         const validation = authValidator.validate(req.body);
         if (validation.error) throw new ApiException("Невалідні дані.", 400);

         next();
      }

      if (subject === 'user') {
         const validation = updateProfileValidator.validate(req.body);
         if (validation.error) throw new ApiException("Невалідні дані.", 400);

         next();
      }

      if (subject === 'note') {
         const validation = noteValidator.validate(req.body);
         if (validation.error) throw new ApiException("Невалідні дані.", 400);

         next();
      }

   }),

};