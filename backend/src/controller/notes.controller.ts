import expressAsyncHandler from "express-async-handler";
import { type Response } from "express";
import { addNoteService, getNotesService } from "../service";
import { NoteRepository, UserRepository } from "../repository";
import { getNotesBySearchService } from "../service";
import { updateNoteService } from "../service/note-service/update-note.service";
import {
   type INoteResponse,
   type IUpdateNote,
   type RequestWithBodyVarParam,
   type RequestWithCustomVar,
   type RequestWithCustomVarAndParam,
   type RequestWithCustomVarAndQuery,
} from "../interface";

export const notesController = {

   addNote: expressAsyncHandler(async (req: RequestWithCustomVar, res: Response<INoteResponse>) => {
      const initialNoteDto = await addNoteService(req.userId!);
      res.json(initialNoteDto);
   }),

   getNotes: expressAsyncHandler(async (req: RequestWithCustomVar, res: Response<INoteResponse[]>) => {
      const notesDto = await getNotesService(req.userId!);
      res.json(notesDto);
   }),

   getNotesCount: expressAsyncHandler(async (req: RequestWithCustomVar, res: Response<number>) => {
      const count = await NoteRepository.count(req.userId!);
      res.json(count);
   }),

   updateNote: expressAsyncHandler(async (req: RequestWithBodyVarParam<IUpdateNote, { noteId: string }>, res: Response<{ message: string }>) => {
      await updateNoteService(req.params.noteId, req.body);
      res.json({ message: "Успішно" });
   }),

   deleteNote: (expressAsyncHandler(async (req: RequestWithCustomVarAndParam<{ noteId: string }>, res: Response<{ message: string }>) => {
      await NoteRepository.findByIdAndDelete(req.params.noteId);
      await UserRepository.findByIdAndUpdate(req.userId!, { $pull: { notesIds: req.params.noteId } });
      res.json({ message: "Успішно" });
   })),

   getNotesBySearch: expressAsyncHandler(async (req: RequestWithCustomVarAndQuery<{ searchKey: string }>, res: Response<INoteResponse[]>) => {
      const notesBySearchDto = await getNotesBySearchService(req.query.searchKey, req.userId!);
      res.json(notesBySearchDto);
   }),

};