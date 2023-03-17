import expressAsyncHandler from "express-async-handler";
import { Response } from "express";
import { addNoteService, getNotesService, deleteNoteService, updateNoteService } from "../service";
import { IRequest, INoteResponse, IUpdateNote, INotesResponse } from "../interface";
import { IDeleteItemBody, IQuery } from "../interface/common.interface";

export const notesController = {

   addNote: expressAsyncHandler(async (req: IRequest<any, any, any>, res: Response<INoteResponse>) => {
      const note = await addNoteService(req.userId);
      res.status(201).json(note);
   }),

   getNotes: expressAsyncHandler(async (req: IRequest<any, any, IQuery>, res: Response<INotesResponse>) => {
      const notes = await getNotesService(req.userId, req.query.searchKey, req.query.limit);
      res.json(notes);
   }),

   updateNote: expressAsyncHandler(async (req: IRequest<IUpdateNote, { noteId: string }, any>, res: Response<{ message: string }>) => {
      await updateNoteService(req.params.noteId, req.body);
      res.json({ message: "Success" });
   }),

   deleteNote: (expressAsyncHandler(async (req: IRequest<IDeleteItemBody, { noteId: string }, any>, res: Response<INotesResponse>) => {
      const notes = await deleteNoteService(req.body, req.params.noteId, req.userId);
      res.json(notes);
   })),

};