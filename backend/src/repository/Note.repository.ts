import { type FilterQuery, type UpdateQuery } from "mongoose";
import { type INoteDatabase, type INoteDto, type INoteSchema, IOAuthSchema } from "../interface";
import { ApiError } from "../error/Api.error";
import { NoteModel } from "../model/Note.model";
import { DeleteResult } from "mongodb";

export const NoteRepository = {

   create: async (filterQuery: FilterQuery<INoteSchema>): Promise<INoteDatabase> => {
      return NoteModel
         .create(filterQuery)
         .catch(e => {
            throw new ApiError("Помилка при роботі з базою даних", 500);
         });
   },

   findAll: async (filterQuery: FilterQuery<INoteSchema>): Promise<INoteDatabase[]> => {
      return NoteModel
         .find(filterQuery)
         .sort({ updatedAt: "desc" })
         .catch(e => {
            throw new ApiError("Помилка при роботі з базою даних", 500);
         });
   },

   findByIdAndUpdate: async (filterQuery: UpdateQuery<INoteSchema>, body: Partial<INoteDto>): Promise<INoteDatabase | null> => {
      return NoteModel
         .findByIdAndUpdate(filterQuery, body)
         .catch(e => {
            throw new ApiError("Помилка при роботі з базою даних", 500);
         });
   },

   deleteById: async (filterQuery: string): Promise<any> => {
      return NoteModel
         .findByIdAndDelete(filterQuery)
         .catch(e => {
            throw new ApiError("Помилка при роботі з базою даних", 500);
         });
   },

};