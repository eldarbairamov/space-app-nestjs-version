import { type FilterQuery, type UpdateQuery } from "mongoose";
import { type INoteDatabase, type INoteDto, type INoteSchema } from "../interface";
import { ApiError } from "../error/Api.error";
import { NoteModel } from "../model";

export const NoteRepository = {

   create: async (body: Partial<INoteSchema>): Promise<INoteDatabase> => {
      return NoteModel
         .create(body)
         .catch(e => {
            console.log(e);
            throw ApiError.DatabaseError();
         });
   },

   findAll: async (filter: FilterQuery<INoteSchema>): Promise<INoteDatabase[]> => {
      return NoteModel
         .find(filter)
         .sort({ updatedAt: "desc" })
         .catch(e => {
            console.log(e);
            throw ApiError.DatabaseError();
         });
   },

   updateById: async (filter: FilterQuery<INoteSchema>, body: UpdateQuery<Partial<INoteDto>>): Promise<INoteDatabase | null> => {
      return NoteModel
         .findByIdAndUpdate(filter, body, {new: true})
         .catch(e => {
            console.log(e);
            throw ApiError.DatabaseError();
         });
   },

   deleteById: async (noteId: string): Promise<INoteDatabase | null> => {
      return NoteModel
         .findByIdAndDelete(noteId)
         .catch(e => {
            console.log(e);
            throw ApiError.DatabaseError();
         });
   },

   getCount: async (noteId: string): Promise<number> => {
      return NoteModel
         .count({ noteOwnerId: noteId })
         .catch(e => {
            console.log(e);
            throw ApiError.DatabaseError();
         });
   },

};