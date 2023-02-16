import expressAsyncHandler from "express-async-handler";
import { NextFunction, Response } from "express";
import { ApiException } from "../exception/api.exception";
import { IRequest } from "../interface";
import { OAuthRepository, UserRepository } from "../repository";
import { jwtVerifyService } from "../service";
import { ACCESS_TOKEN_TYPE } from "../constant";

export const authMiddleware = {

   isUserExists: expressAsyncHandler(async (req: IRequest<{ email: string }, any, any>, res: Response, next: NextFunction) => {
      const user = await UserRepository.findOne({ email: req.body.email });
      if (!user) throw new ApiException("User is not found", 401);

      req.user = user;

      next();
   }),

   isEmailUnique: expressAsyncHandler(async (req: IRequest<{ email: string }, any, any>, res: Response, next: NextFunction) => {
      const user = await UserRepository.findOne({ email: req.body.email });
      if (user) throw new ApiException("User with this email is already exists", 409);

      next();
   }),

   isAccessExists: expressAsyncHandler(async (req: IRequest<any, any, any>, res: Response, next: NextFunction) => {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) throw new ApiException("Unauthorized", 401);

      const isAccessTokenExists = await OAuthRepository.findOne({ accessToken: token });
      if (!isAccessTokenExists) throw new ApiException("Unauthorized", 401);

      req.userId = jwtVerifyService(token, ACCESS_TOKEN_TYPE);
      req.token = token;

      next();
   }),


};