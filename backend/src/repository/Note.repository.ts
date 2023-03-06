import { FilterQuery, UpdateQuery } from "mongoose";
import { ApiException } from "../exception/api.exception";
import { INote, NoteDocument, NoteModel } from "../model";

export const NoteRepository = {

   create: async (body: Partial<INote>): Promise<NoteDocument> => {
      try {
         return NoteModel.create(body);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

   find: async (filter: FilterQuery<INote>, searchKey: string, limit: string | number): Promise<NoteDocument[]> => {
      const filterObj = searchKey ? { ...filter, title: { $regex: searchKey, $options: "i" } } : { ...filter };
      try {
         return NoteModel.find(filterObj).sort({ updatedAt: "desc" }).limit(Number(limit));
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

   findById: async (noteId: NoteDocument["id"]): Promise<NoteDocument | null> => {
      try {
         return NoteModel.findById(noteId);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

   findByIdAndUpdate: async (noteId: NoteDocument["id"], body: UpdateQuery<INote>): Promise<NoteDocument | null> => {
      try {
         return NoteModel.findByIdAndUpdate(noteId, body, { new: true });
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

   findByIdAndDelete: async (noteId: NoteDocument["id"]): Promise<NoteDocument | null> => {
      try {
         return NoteModel.findByIdAndDelete(noteId);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

   count: async (filter: FilterQuery<INote>, searchKey = ""): Promise<number> => {
      const filterObj = searchKey ? { ...filter, title: { $regex: searchKey, $options: "i" } } : { ...filter };
      try {
         return NoteModel.count(filterObj);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

};