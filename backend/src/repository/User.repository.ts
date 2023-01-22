import { UserModel } from "../model";
import { type FilterQuery, type HydratedDocument, type UpdateQuery } from "mongoose";
import { type IUserDatabase, type IUserSchema } from "../interface";
import { ApiError } from "../error/Api.error";

export const UserRepository = {

   create: async (filterQuery: FilterQuery<IUserSchema>): Promise<IUserDatabase> => {
      return UserModel
         .create(filterQuery)
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

   findOneAndUpdate: async (filterQuery: FilterQuery<IUserDatabase>, user: UpdateQuery<IUserSchema>): Promise<IUserDatabase | null> => {
      return UserModel
         .findOneAndUpdate(filterQuery, user, { new: true })
         .catch(e => {
            console.log(e);
            throw new ApiError("Помилка при роботі з базою даних", 500);
         });
   },

};
