import { FilterQuery, UpdateQuery } from "mongoose";
import { ApiException } from "../exception/api.exception";
import { INote, NoteDocument, NoteModel, UserDocument } from "../model";
import { IQuery } from "../interface";

export const NoteRepository = {

   create: async (body: Partial<INote>): Promise<NoteDocument> => {
      try {
         return NoteModel.create(body);
      } catch (e) {
         throw ApiException.DatabaseError(e);
      }
   },

   find: async (filter: FilterQuery<INote>, query: IQuery): Promise<NoteDocument[]> => {
      try {
         const { limit = 20, page = 1, searchKey } = query;
         const filterObj = searchKey ? { ...filter, title: { $regex: searchKey, $options: "i" } } : { ...filter };

         return NoteModel.find(filterObj).limit(+limit).skip((+page - 1) * +limit).sort({ updatedAt: "desc" });
      } catch (e) {
         throw ApiException.DatabaseError(e);
      }
   },

   findById: async (noteId: NoteDocument["id"]): Promise<NoteDocument | null> => {
      try {
         return NoteModel.findById(noteId);
      } catch (e) {
         throw ApiException.DatabaseError(e);
      }
   },

   findByIdAndUpdate: async (noteId: NoteDocument["id"], body: UpdateQuery<INote>): Promise<NoteDocument | null> => {
      try {
         return NoteModel.findByIdAndUpdate(noteId, body, { new: true });
      } catch (e) {
         throw ApiException.DatabaseError(e);
      }
   },

   findByIdAndDelete: async (noteId: NoteDocument["id"]): Promise<NoteDocument | null> => {
      try {
         return NoteModel.findByIdAndDelete(noteId);
      } catch (e) {
         throw ApiException.DatabaseError(e);
      }
   },

   count: async (userId: UserDocument["id"], searchKey = ''): Promise<number> => {
      try {
         const filterObj = searchKey ? { ownerId: userId, title: { $regex: searchKey, $options: "i" } } : { ownerId: userId};
         return NoteModel.count(filterObj);
      } catch (e) {
         throw ApiException.DatabaseError(e);
      }
   },

};