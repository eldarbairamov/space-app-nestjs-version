import expressAsyncHandler from "express-async-handler";
import { RequestWithParam } from "../interface";
import { type NextFunction, type Response } from "express";
import { ApiException } from "../exception/api.exception";
import { NoteRepository } from "../repository";
import { Types } from "mongoose";

export const noteMiddleware = {

   isNoteExists: expressAsyncHandler(async (req: RequestWithParam<{ noteId: string }>, res: Response, next: NextFunction) => {
      const noteId = req.params.noteId;
      if (!noteId) throw ApiException.BadRequest();

      const isNoteExist = await NoteRepository.findById(noteId);
      if (!isNoteExist) throw ApiException.NotFound();

      next();
   }),

   isIdValid: expressAsyncHandler(async (req: RequestWithParam<{ noteId: string }>, res: Response, next: NextFunction) => {
      const noteId = req.params.noteId;

      if (!Types.ObjectId.isValid(noteId)) throw ApiException.ObjectID();

      next();
   }),

};