import expressAsyncHandler from "express-async-handler";
import { Response } from "express";
import { addNoteService, getNotesService } from "../service";
import { NoteRepository, UserRepository } from "../repository";
import { IRequest, INoteResponse, IUpdateNote } from "../interface";
import { updateNoteService } from "../service/note/update-note.service";

export const notesController = {

   addNote: expressAsyncHandler(async (req: IRequest<any, any, any>, res: Response<INoteResponse>) => {
      const note = await addNoteService(req.userId);
      res.json(note);
   }),

   getNotes: expressAsyncHandler(async (req: IRequest<any, any, { searchKey: string }>, res: Response<INoteResponse[]>) => {
      const notes = await getNotesService(req.userId, req.query.searchKey);
      res.json(notes);
   }),

   updateNote: expressAsyncHandler(async (req: IRequest<IUpdateNote, { noteId: string }, any>, res: Response<{ message: string }>) => {
      await updateNoteService(req.params.noteId, req.body);
      res.json({ message: "Success" });
   }),

   deleteNote: (expressAsyncHandler(async (req: IRequest<any, { noteId: string }, any>, res: Response<{ message: string }>) => {
      await NoteRepository.findByIdAndDelete(req.params.noteId);
      await UserRepository.findByIdAndUpdate(req.userId, { $pull: { notesIds: req.params.noteId } });
      res.json({ message: "Success" });
   })),

};