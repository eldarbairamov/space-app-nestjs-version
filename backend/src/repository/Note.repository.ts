import { type FilterQuery } from "mongoose";
import { type INoteDatabase, type INoteSchema } from "../interface";
import { ApiError } from "../error/Api.error";
import { NoteModel } from "../model/Note.model";

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
         .catch(e => {
            throw new ApiError("Помилка при роботі з базою даних", 500);
         });
   },
};