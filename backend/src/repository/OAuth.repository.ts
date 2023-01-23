import { type FilterQuery } from "mongoose";
import { type IOAuthDatabase, type IOAuthSchema } from "../interface";
import { OAuthModel } from "../model";
import { ApiError } from "../error/Api.error";
import { type DeleteResult } from "mongodb";

export const OAuthRepository = {
   create: async (filterQuery: FilterQuery<IOAuthSchema>): Promise<IOAuthDatabase> => {
      return OAuthModel
         .create(filterQuery)
         .catch(e => {
            throw new ApiError("Помилка при роботі з базою даних", 500);
         });
   },

   delete: async (filterQuery: FilterQuery<IOAuthSchema>): Promise<DeleteResult | void> => {
      return OAuthModel
         .deleteOne(filterQuery)
         .catch(e => {
            throw new ApiError("Помилка при роботі з базою даних", 500);
         });
   },
};