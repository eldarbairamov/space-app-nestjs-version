import expressAsyncHandler from "express-async-handler";
import {
   type IUserSchema,
   type RequestWithBodyAndVar,
} from "../interface";
import { type NextFunction, type Response } from "express";
import { ApiException } from "../exception/api.exception";
import { UserRepository } from "../repository";

export const userMiddleware = {

   isChangesSame: expressAsyncHandler(async (req: RequestWithBodyAndVar<IUserSchema>, res: Response, next: NextFunction) => {
      const userDto = req.body;
      const userFromDb = await UserRepository.findOne({ _id: req.userId });

      const objToCompare = {
         username: userFromDb!.username,
         name: userFromDb!.name,
         surname: userFromDb!.surname,
      };

      if (JSON.stringify(userDto) === JSON.stringify(objToCompare)) throw new ApiException("Дані не потребують змін.", 400);

      next();
   }),

};