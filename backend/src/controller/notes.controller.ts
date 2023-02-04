import expressAsyncHandler from "express-async-handler";
import { type Response } from "express";
import { addNoteService, getNotesService } from "../service";
import {
   type RequestWithBodyVarParam,
   type RequestWithCustomVar, type RequestWithCustomVarAndParam, RequestWithCustomVarAndQuery,
} from "../interface";
import { NoteRepository, UserRepository } from "../repository";
import { getNotesBySearchService } from "../service";
import { NoteResponseDto, NoteUpdateDto } from "../dto";

export const notesController = {

   addNote: expressAsyncHandler(async (req: RequestWithCustomVar, res: Response<NoteResponseDto>) => {
      const initialNoteDto = await addNoteService(req.userId!);
      res.json(initialNoteDto);
   }),

   getNotes: expressAsyncHandler(async (req: RequestWithCustomVar, res: Response<NoteResponseDto[]>) => {
      const notesDto = await getNotesService(req.userId!);
      res.json(notesDto);
   }),

   getNotesCount: expressAsyncHandler(async (req: RequestWithCustomVar, res: Response<number>) => {
      const count = await NoteRepository.count(req.userId!);
      res.json(count);
   }),

   updateNote: expressAsyncHandler(async (req: RequestWithBodyVarParam<NoteUpdateDto, { noteId: string }>, res: Response<{ message: string }>) => {
      await NoteRepository.findByIdAndUpdate(req.params.noteId, req.body);
      res.json({ message: "Успішно" });
   }),

   deleteNote: (expressAsyncHandler(async (req: RequestWithCustomVarAndParam<{ noteId: string }>, res: Response<{ message: string }>) => {
      await NoteRepository.findByIdAndDelete(req.params.noteId);
      await UserRepository.findByIdAndUpdate(req.userId!, { $pull: { notesIds: req.params.noteId } });
      res.json({ message: "Успішно" });
   })),

   getNotesBySearch: expressAsyncHandler(async (req: RequestWithCustomVarAndQuery<{ searchKey: string }>, res: Response<NoteResponseDto[]>) => {
      const notesBySearchDto = await getNotesBySearchService(req.query.searchKey, req.userId!);
      res.json(notesBySearchDto);
   }),

};