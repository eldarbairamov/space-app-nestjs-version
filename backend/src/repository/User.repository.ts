import { UserModel } from "../model";
import { type FilterQuery, type HydratedDocument, type UpdateQuery } from "mongoose";
import { type IUserDatabase, type IUserSchema } from "../interface";
import { ApiError } from "../error/Api.error";

export const UserRepository = {

   create: async (body: Partial<IUserSchema>): Promise<IUserDatabase> => {
      return UserModel
         .create(body)
         .catch(e => {
            console.log(e);
            throw new ApiError("Помилка при роботі з базою даних", 500);
         });
   },

   findOne: async (filterQuery: FilterQuery<IUserDatabase>): Promise<HydratedDocument<IUserDatabase> | null> => {
      return UserModel
         .findOne(filterQuery)
         .catch(e => {
            console.log(e);
            throw new ApiError("Помилка при роботі з базою даних", 500);
         });
   },

   findByIdAndUpdate: async (id: string, update: UpdateQuery<IUserSchema>): Promise<IUserDatabase | null> => {
      return UserModel
         .findByIdAndUpdate(id, update, { new: true })
         .catch(e => {
            console.log(e);
            throw new ApiError("Помилка при роботі з базою даних", 500);
         });
   },

};
