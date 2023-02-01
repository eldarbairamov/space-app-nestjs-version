import expressAsyncHandler from "express-async-handler";
import { type NextFunction, type Response } from "express";
import { ApiError } from "../error/Api.error";
import {
   type IRegistrationDto,
   type IUserSchema,
   type RequestWithBody,
   type RequestWithBodyAndCustomVar,
   type RequestWithCustomVar,
} from "../interface";
import { OAuthRepository, UserRepository } from "../repository";
import { authValidator } from "../validator";
import { jwtVerifierService } from "../service";
import { tokenTypeEnum } from "../enum/token-type.enum";

export const authMiddleware = {

   isRequestValid: expressAsyncHandler(async (req: RequestWithBody<IRegistrationDto>, res: Response, next: NextFunction) => {
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
      if (user) throw new ApiError("Користувач з такой електронною поштою вже існує", 409);

      next();
   }),

   isAccessTokenValid: expressAsyncHandler(async (req: RequestWithCustomVar, res: Response, next: NextFunction) => {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) throw new ApiError("Токен невалідний", 401);

      const isAccessTokenExists = await OAuthRepository.findOne({ accessToken: token });
      if (!isAccessTokenExists) throw new ApiError("Токен невалідний", 401);

      req.userId = jwtVerifierService(token, tokenTypeEnum.ACCESS_TOKEN);
      req.token = token;

      next();
   }),

};