import expressAsyncHandler from "express-async-handler";
import { type Response } from "express";
import { addNoteService, getNotesService } from "../service";
import {
   type INoteDto,
   type INoteSchema,
   type RequestWithBodyVarParams,
   type RequestWithCustomVar, type RequestWithCustomVarAndParams,
} from "../interface";
import { NoteRepository } from "../repository";

export const notesController = {

   addNote: expressAsyncHandler(async (req: RequestWithCustomVar, res: Response<INoteDto>) => {
      const noteStater = await addNoteService(req.userId!);
      res.json(noteStater);
   }),

   getNotes: expressAsyncHandler(async (req: RequestWithCustomVar, res: Response<INoteDto[]>) => {
      const notes = await getNotesService(req.userId!);
      res.json(notes);
   }),

   getNotesCount: expressAsyncHandler(async (req: RequestWithCustomVar, res: Response<number>) => {
      const count = await NoteRepository.getCount(req.userId!);
      res.json(count);
   }),

   saveNote: expressAsyncHandler(async (req: RequestWithBodyVarParams<Partial<INoteSchema>, { noteId: string }>, res: Response<{ message: string }>) => {
      await NoteRepository.updateById({ _id: req.params.noteId, noteOwnerId: req.userId }, req.body);
      res.json({ message: "Успішно" });
   }),

   deleteNote: (expressAsyncHandler(async (req: RequestWithCustomVarAndParams<{ noteId: string }>, res: Response<{ message: string }>) => {
      await NoteRepository.deleteById(req.params.noteId);
      res.json({ message: "Успішно" });
   })),

};