import expressAsyncHandler from "express-async-handler";
import { type NextFunction, type Response } from "express";
import { ApiException } from "../exception/api.exception";
import { type RequestWithBody, type RequestWithBodyAndVar } from "../interface";
import { UserRepository } from "../repository";

export const authMiddleware = {

   isUserExists: expressAsyncHandler(async (req: RequestWithBodyAndVar<{ email: string }>, res: Response, next: NextFunction) => {
      const user = await UserRepository.findOne({ email: req.body.email });
      if (!user) throw new ApiException("Користувача не знайдено", 401);

      req.user = user;

      next();
   }),

   isEmailUnique: expressAsyncHandler(async (req: RequestWithBody<{ email: string }>, res: Response, next: NextFunction) => {
      const user = await UserRepository.findOne({ email: req.body.email });
      if (user) throw new ApiException("Користувач з такой електронною поштою вже існує", 409);

      next();
   }),

};