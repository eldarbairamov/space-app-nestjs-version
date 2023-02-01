import { type FilterQuery, type UpdateQuery } from "mongoose";
import { type INoteDatabase, type INoteDto, type INoteSchema } from "../interface";
import { ApiException } from "../error/api.expception";
import { NoteModel } from "../model";

export const NoteRepository = {

   create: async (body: Partial<INoteSchema>): Promise<INoteDatabase> => {
      try {
         return NoteModel.create(body);
      } catch (e) {
         throw ApiException.Database(e);
      }
   },

   find: async (filter: FilterQuery<INoteSchema>): Promise<INoteDatabase[]> => {
      try {
         return NoteModel.find(filter).sort({ updatedAt: "desc" });
      } catch (e) {
         throw ApiException.Database(e);
      }
   },

   findById: async (id: string): Promise<INoteDatabase | null> => {
      try {
         return NoteModel.findById(id);
      } catch (e) {
         throw ApiException.Database(e);
      }
   },

   findByIdAndUpdate: async (noteId: string, body: UpdateQuery<Partial<INoteDto>>): Promise<INoteDatabase | null> => {
      try {
         return NoteModel.findByIdAndUpdate(noteId, body, { new: true });
      } catch (e) {
         throw ApiException.Database(e);
      }
   },

   findByIdAndDelete: async (noteId: string): Promise<INoteDatabase | null> => {
      try {
         return NoteModel.findByIdAndDelete(noteId);
      } catch (e) {
         throw ApiException.Database(e);
      }
   },

   count: async (noteId: string): Promise<number> => {
      try {
         return NoteModel.count({ ownerId: noteId });
      } catch (e) {
         throw ApiException.Database(e);
      }
   },

};