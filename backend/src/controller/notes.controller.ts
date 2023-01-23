import expressAsyncHandler from "express-async-handler";
import { type Response } from "express";
import { addInitialNoteService } from "../service/notes-service/add-initial-note.service";
import { type RequestWithCustomVar } from "../interface";
import { getNotesService } from "../service/notes-service/get-notes.service";

export const notesController = {

   addNote: expressAsyncHandler(async (req: RequestWithCustomVar, res: Response) => {
      const noteStater = await addInitialNoteService(req.userId!);
      res.json(noteStater);
   }),

   getNotes: expressAsyncHandler(async (req: RequestWithCustomVar, res: Response) => {
      const notes = await getNotesService(req.userId!);
      res.json(notes)
   }),
};