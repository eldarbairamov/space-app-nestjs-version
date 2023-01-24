import expressAsyncHandler from "express-async-handler";
import { type INoteDto, type RequestWithBody } from "../interface";
import { type NextFunction, type Response } from "express";
import { ApiError } from "../error/Api.error";
import { noteValidator } from "../validator/note.validator";

export const noteMiddleware = {
   isRequestValid: expressAsyncHandler(async (req: RequestWithBody<INoteDto>, res: Response, next: NextFunction) => {
      const validation = noteValidator.validate(req.body);
      if (validation.error) throw new ApiError("Дані не валідні", 400);

      next();
   }),
};