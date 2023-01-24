import expressAsyncHandler from "express-async-handler";
import { type Response, type NextFunction } from "express";
import { ApiError } from "../error/Api.error";
import {
   type RequestWithBody,
   type IUserSchema,
   type RequestWithBodyAndCustomVar,
   type RequestWithCustomVar,
} from "../interface";
import { UserRepository } from "../repository";
import { authValidator } from "../validator";
import * as jwt from "jsonwebtoken";

export const authMiddleware = {

   isRequestEmpty: expressAsyncHandler(async (req: RequestWithBody<IUserSchema>, res: Response, next: NextFunction) => {
      if (!Object.entries(req.body).length) throw new ApiError("Запит пустий", 400);

      next();
   }),

   isRequestValid: expressAsyncHandler(async (req: RequestWithBody<IUserSchema>, res: Response, next: NextFunction) => {
      const validation = authValidator.validate(req.body);
      if (validation.error) throw new ApiError("Дані не валідні", 400);

      next();
   }),

   isUserExists: expressAsyncHandler(async (req: RequestWithBodyAndCustomVar<IUserSchema>, res: Response, next: NextFunction) => {
      const user = await UserRepository.findOne({ email: req.body.email });
      if (!user) throw new ApiError("Користувач не знайдений", 401);

      req.user = user;

      next();
   }),

   isEmailUnique: expressAsyncHandler(async (req: RequestWithBody<{ email: string }>, res: Response, next: NextFunction) => {
      const user = await UserRepository.findOne({ email: req.body.email });
      if (user) throw new ApiError("Такий користувач вже існує", 401);

      next();
   }),

   isAccessTokenValid: expressAsyncHandler(async (req: RequestWithCustomVar, res: Response, next: NextFunction) => {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) throw new ApiError("Токен не валідний", 401);

      const { userId } = jwt.verify(token, "secret access token key") as { userId: string };
      if (!userId) throw new ApiError("Токен не валідний", 401);

      req.userId = userId;
      req.token = token;

      next();
   }),
};