import expressAsyncHandler from "express-async-handler";
import { Response } from "express";
import { addNoteService, getNotesService } from "../service";
import { NoteRepository, UserRepository } from "../repository";
import { getNotesBySearchService } from "../service";
import { INoteResponse, IUpdateNote, RequestWithBodyVarParam, RequestWithCustomVar, RequestWithCustomVarAndParam, RequestWithCustomVarAndQuery } from "../interface";
import { updateNoteService } from "../service/note/update-note.service";

export const notesController = {

   addNote: expressAsyncHandler(async (req: RequestWithCustomVar, res: Response<INoteResponse>) => {
      const note = await addNoteService(req.userId!);
      res.json(note);
   }),

   getNotes: expressAsyncHandler(async (req: RequestWithCustomVar, res: Response<INoteResponse[]>) => {
      const note = await getNotesService(req.userId!);
      res.json(note);
   }),

   getNotesCount: expressAsyncHandler(async (req: RequestWithCustomVar, res: Response<number>) => {
      const count = await NoteRepository.count(req.userId!);
      res.json(count);
   }),

   updateNote: expressAsyncHandler(async (req: RequestWithBodyVarParam<IUpdateNote, { noteId: string }>, res: Response<{ message: string }>) => {
      await updateNoteService(req.params.noteId, req.body);
      res.json({ message: "Success" });
   }),

   deleteNote: (expressAsyncHandler(async (req: RequestWithCustomVarAndParam<{ noteId: string }>, res: Response<{ message: string }>) => {
      await NoteRepository.findByIdAndDelete(req.params.noteId);
      await UserRepository.findByIdAndUpdate(req.userId!, { $pull: { notesIds: req.params.noteId } });
      res.json({ message: "Success" });
   })),

   getNotesBySearch: expressAsyncHandler(async (req: RequestWithCustomVarAndQuery<{ searchKey: string }>, res: Response<INoteResponse[]>) => {
      const notesBySearch = await getNotesBySearchService(req.query.searchKey, req.userId!);
      res.json(notesBySearch);
   }),

};