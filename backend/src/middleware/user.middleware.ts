import expressAsyncHandler from "express-async-handler";
import { type IUserSchema, type RequestWithBody, type RequestWithBodyAndVar } from "../interface";
import { type NextFunction, type Response } from "express";
import { emailValidator, updateProfileValidator } from "../validator";
import { ApiException } from "../error/api.exception";
import { UserRepository } from "../repository";

export const userMiddleware = {

   isRequestValid: expressAsyncHandler(async (req: RequestWithBody<IUserSchema>, res: Response, next: NextFunction) => {
      const validation = updateProfileValidator.validate(req.body);
      if (validation.error) throw new ApiException("Дані не валідні", 400);

      next();
   }),

   isChangesSame: expressAsyncHandler(async (req: RequestWithBodyAndVar<IUserSchema>, res: Response, next: NextFunction) => {
      const userDto = req.body;
      const userFromDb = await UserRepository.findOne({ _id: req.userId });

      const objToCompare = {
         username: userFromDb?.username,
         name: userFromDb?.name,
         surname: userFromDb?.surname,
      };

      if (JSON.stringify(userDto) === JSON.stringify(objToCompare)) throw new ApiException("Дані не потребують змін", 400);

      next();
   }),

   isEmailValid: expressAsyncHandler(async (req: RequestWithBody<{ email: string }>, res: Response, next: NextFunction) => {
      const validation = emailValidator.validate({ email: req.body.email });
      if (validation.error) throw new ApiException("Електронна пошта не валідна", 400);

      next();
   }),

};