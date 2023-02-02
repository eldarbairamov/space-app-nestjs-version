import expressAsyncHandler from "express-async-handler";
import { type NextFunction, type Response } from "express";
import { ApiException } from "../error/api.expception";
import {
   type IUserSchema,
   type RequestWithBody,
   type RequestWithBodyAndVar,
   type RequestWithCustomVar,
} from "../interface";
import { OAuthRepository, UserRepository } from "../repository";
import { authValidator } from "../validator";
import { jwtVerifierService } from "../service";
import { ACCESS_TOKEN_TYPE } from "../constant";
import { RegistrationDto } from "../dto/registration.dto";

export const authMiddleware = {

   isRequestValid: expressAsyncHandler(async (req: RequestWithBody<RegistrationDto>, res: Response, next: NextFunction) => {
      const validation = authValidator.validate(req.body);
      if (validation.error) throw new ApiException("Дані не валідні", 400);

      next();
   }),

   isUserExists: expressAsyncHandler(async (req: RequestWithBodyAndVar<IUserSchema>, res: Response, next: NextFunction) => {
      const user = await UserRepository.findOne({ email: req.body.email });
      if (!user) throw new ApiException("Користувач не знайдений", 401);

      req.user = user;

      next();
   }),

   isEmailUnique: expressAsyncHandler(async (req: RequestWithBody<{ email: string }>, res: Response, next: NextFunction) => {
      const user = await UserRepository.findOne({ email: req.body.email });
      if (user) throw new ApiException("Користувач з такой електронною поштою вже існує", 409);

      next();
   }),

   isAccessTokenValid: expressAsyncHandler(async (req: RequestWithCustomVar, res: Response, next: NextFunction) => {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) throw new ApiException("Токен невалідний", 401);

      const isAccessTokenExists = await OAuthRepository.findOne({ accessToken: token });
      if (!isAccessTokenExists) throw new ApiException("Токен невалідний", 401);

      req.userId = jwtVerifierService(token, ACCESS_TOKEN_TYPE);
      req.token = token;

      next();
   }),

};