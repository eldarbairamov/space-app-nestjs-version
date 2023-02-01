import expressAsyncHandler from "express-async-handler";
import { type INoteDto, type RequestWithBody, RequestWithParams } from "../interface";
import { type NextFunction, type Response } from "express";
import { ApiError } from "../error/Api.error";
import { noteValidator } from "../validator";
import { NoteRepository } from "../repository";
import { Types } from "mongoose";

export const noteMiddleware = {

   isRequestValid: expressAsyncHandler(async (req: RequestWithBody<INoteDto>, res: Response, next: NextFunction) => {
      const validation = noteValidator.validate(req.body);
      if (validation.error) throw new ApiError("Дані не валідні", 400);

      next();
   }),

   isNoteExists: expressAsyncHandler(async (req: RequestWithParams<{ noteId: string }>, res: Response, next: NextFunction) => {
      const noteId = req.params.noteId;
      if (!noteId) throw ApiError.BadRequest();

      const isNoteExist = await NoteRepository.findById(noteId);
      if (!isNoteExist) throw ApiError.NotFound();

      next();
   }),

   isObjectIdValid: expressAsyncHandler(async (req: RequestWithParams<{ noteId: string }>, res: Response, next: NextFunction) => {
      const noteId = req.params.noteId;

      if (!Types.ObjectId.isValid(noteId)) throw ApiError.ObjectID();

      next();
   }),

};