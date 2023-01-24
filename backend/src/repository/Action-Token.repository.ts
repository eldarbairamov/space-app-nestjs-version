import { type FilterQuery } from "mongoose";
import { type IActionTokenDatabase, type IActionTokenSchema } from "../interface";
import { ActionTokenModel } from "../model";
import { ApiError } from "../error/Api.error";

export const ActionTokenRepository = {
   create: async (filterQuery: FilterQuery<IActionTokenSchema>): Promise<IActionTokenDatabase> => {
      return ActionTokenModel
         .create(filterQuery)
         .catch(e => {
            console.log(e);
            throw new ApiError("Помилка при роботі з базою даних", 500);
         });
   },

   findOneAndDelete: async (filterQuery: FilterQuery<IActionTokenSchema>): Promise<IActionTokenDatabase | null> => {
      return ActionTokenModel
         .findOneAndDelete(filterQuery)
         .catch(e => {
            console.log(e);
            throw new ApiError("Помилка при роботі з базою даних", 500);
         });
   },
};