import expressAsyncHandler from "express-async-handler";
import { RequestWithCustomVar } from "../interface";
import { NextFunction, Response } from "express";
import { ApiException } from "../exception/api.exception";
import { OAuthRepository } from "../repository";
import { jwtVerifyService } from "../service";
import { ACCESS_TOKEN_TYPE } from "../constant";

export const isAccessExists = expressAsyncHandler(async (req: RequestWithCustomVar, res: Response, next: NextFunction) => {
   const token = req.headers.authorization?.split(" ")[1];
   if (!token) throw new ApiException("Invalid token", 401);

   const isAccessTokenExists = await OAuthRepository.findOne({ accessToken: token });
   if (!isAccessTokenExists) throw new ApiException("Invalid token", 401);

   req.userId = jwtVerifyService(token, ACCESS_TOKEN_TYPE);
   req.token = token;

   next();

});