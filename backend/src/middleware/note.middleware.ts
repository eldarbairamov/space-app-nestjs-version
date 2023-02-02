import expressAsyncHandler from "express-async-handler";
import { type RequestWithBody, RequestWithParam } from "../interface";
import { type NextFunction, type Response } from "express";
import { ApiException } from "../error/api.exception";
import { noteValidator } from "../validator";
import { NoteRepository } from "../repository";
import { Types } from "mongoose";
import { NoteDto } from "../dto";

export const noteMiddleware = {

   isRequestValid: expressAsyncHandler(async (req: RequestWithBody<NoteDto>, res: Response, next: NextFunction) => {
      const validation = noteValidator.validate(req.body);
      if (validation.error) throw new ApiException("Дані не валідні", 400);

      next();
   }),

   isNoteExists: expressAsyncHandler(async (req: RequestWithParam<{ noteId: string }>, res: Response, next: NextFunction) => {
      const noteId = req.params.noteId;
      if (!noteId) throw ApiException.BadRequest();

      const isNoteExist = await NoteRepository.findById(noteId);
      if (!isNoteExist) throw ApiException.NotFound();

      next();
   }),

   isObjectIdValid: expressAsyncHandler(async (req: RequestWithParam<{ noteId: string }>, res: Response, next: NextFunction) => {
      const noteId = req.params.noteId;

      if (!Types.ObjectId.isValid(noteId)) throw ApiException.ObjectID();

      next();
   }),

};