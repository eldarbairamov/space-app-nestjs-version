import { FilterQuery, UpdateQuery } from "mongoose";
import { ApiException } from "../exception/api.exception";
import { INote, NoteDocument, NoteModel } from "../model";

export const NoteRepository = {

   create: async (body: Partial<INote>): Promise<NoteDocument> => {
      try {
         return NoteModel.create(body);
      } catch (e) {
         throw ApiException.Database(e);
      }
   },

   find: async (filter: FilterQuery<INote>): Promise<NoteDocument[]> => {
      try {
         return NoteModel.find(filter).sort({ updatedAt: "desc" });
      } catch (e) {
         throw ApiException.Database(e);
      }
   },

   findById: async (noteId: NoteDocument["id"]): Promise<NoteDocument | null> => {
      try {
         return NoteModel.findById(noteId);
      } catch (e) {
         throw ApiException.Database(e);
      }
   },

   findByIdAndUpdate: async (noteId: NoteDocument["id"], body: UpdateQuery<INote>): Promise<NoteDocument | null> => {
      try {
         return NoteModel.findByIdAndUpdate(noteId, body, { new: true });
      } catch (e) {
         throw ApiException.Database(e);
      }
   },

   findByIdAndDelete: async (noteId: NoteDocument["id"]): Promise<NoteDocument | null> => {
      try {
         return NoteModel.findByIdAndDelete(noteId);
      } catch (e) {
         throw ApiException.Database(e);
      }
   },

   count: async (noteId: NoteDocument["id"]): Promise<number> => {
      try {
         return NoteModel.count({ ownerId: noteId });
      } catch (e) {
         throw ApiException.Database(e);
      }
   },

};