import { type FilterQuery , type UpdateQuery } from "mongoose";
import { type INoteDatabase, type INoteDto, type INoteSchema } from "../interface";
import { ApiError } from "../error/Api.error";
import { NoteModel } from "../model";

export const NoteRepository = {

   create: async (body: Partial<INoteSchema>): Promise<INoteDatabase> => {
      return NoteModel
         .create(body)
         .catch(e => {
            throw new ApiError("Помилка при роботі з базою даних", 500);
         });
   },

   findAll: async (filter: FilterQuery<INoteSchema>): Promise<INoteDatabase[]> => {
      return NoteModel
         .find(filter)
         .sort({ updatedAt: "desc" })
         .catch(e => {
            console.log(e);
            throw new ApiError("Помилка при роботі з базою даних", 500);
         });
   },

   findOneAndUpdate: async (filter: FilterQuery<INoteSchema>, body: UpdateQuery<Partial<INoteDto>>): Promise<INoteDatabase | null> => {
      return NoteModel
         .findByIdAndUpdate(filter, body)
         .catch(e => {
            console.log(e);
            throw new ApiError("Помилка при роботі з базою даних", 500);
         });
   },

   deleteById: async (id: string): Promise<any> => {
      return NoteModel
         .findByIdAndDelete(id)
         .catch(e => {
            console.log(e);
            throw new ApiError("Помилка при роботі з базою даних", 500);
         });
   },

};