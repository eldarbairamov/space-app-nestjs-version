import expressAsyncHandler from "express-async-handler";
import { type Response } from "express";
import { addInitialNoteService } from "../service/notes-service/add-initial-note.service";
import {
   type INoteSchema,
   type RequestWithBodyVarParams,
   type RequestWithCustomVar, type RequestWithCustomVarAndParams,
} from "../interface";
import { getNotesService } from "../service/notes-service/get-notes.service";
import { NoteRepository } from "../repository/Note.repository";
import { NoteModel } from "../model/Note.model";

export const notesController = {

   addNote: expressAsyncHandler(async (req: RequestWithCustomVar, res: Response) => {
      const noteStater = await addInitialNoteService(req.userId!);
      res.json(noteStater);
   }),

   getNotes: expressAsyncHandler(async (req: RequestWithCustomVar, res: Response) => {
      const notes = await getNotesService(req.userId!);
      res.json(notes);
   }),

   getNotesCount: expressAsyncHandler(async (req: RequestWithCustomVar, res: Response) => {
      const count = await NoteModel.count({ noteOwnerId: req.userId });
      res.json(count);
   }),

   saveNote: expressAsyncHandler(async (req: RequestWithBodyVarParams<Partial<INoteSchema>, { noteId: string }>, res: Response<{ message: string }>) => {
      await NoteRepository.findByIdAndUpdate({ _id: req.params.noteId, noteOwnerId: req.userId }, req.body);
      res.json({ message: "Замітка збережена" });
   }),

   deleteNote: (expressAsyncHandler(async (req: RequestWithCustomVarAndParams<{ noteId: string }>, res: Response<{ message: string }>) => {
      await NoteRepository.deleteById(req.params.noteId);
      res.json({ message: "Замітка видалена" });
   })),

};