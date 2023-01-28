import expressAsyncHandler from "express-async-handler";
import { type NextFunction, type Response } from "express";
import { ApiError } from "../error/Api.error";
import {
   type IUserSchema,
   type RequestWithBody,
   type RequestWithBodyAndCustomVar,
   type RequestWithCustomVar,
} from "../interface";
import { OAuthRepository, UserRepository } from "../repository";
import { authValidator } from "../validator";
import { jwtVerifierService } from "../service/auth-service/jwt-verifier.service";
import { tokenTypeEnum } from "../enum/token-type.enum";

export const authMiddleware = {

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

      const isAccessTokenExists = await OAuthRepository.findOne({ accessToken: token });
      if (!isAccessTokenExists) throw new ApiError("Користувач не авторизований", 401);

      req.userId = jwtVerifierService(token, tokenTypeEnum.ACCESS_TOKEN);
      req.token = token;

      next();
   }),
};