import { UserModel } from "../model";
import { type FilterQuery, type UpdateQuery } from "mongoose";
import { type IUserDatabase, type IUserSchema } from "../interface";
import { ApiError } from "../error/Api.error";

export const UserRepository = {

   create: async (body: Partial<IUserSchema>): Promise<IUserDatabase> => {
      return UserModel
         .create(body)
         .catch(e => {
            console.log(e);
            throw ApiError.DatabaseError();
         });
   },

   findOne: async (filter: FilterQuery<IUserDatabase>): Promise<IUserDatabase | null> => {
      return UserModel
         .findOne(filter)
         .catch(e => {
            console.log(e);
            throw ApiError.DatabaseError();
         });
   },

   updateById: async (userId: string, update: UpdateQuery<IUserSchema>): Promise<IUserDatabase | null> => {
      return UserModel
         .findByIdAndUpdate(userId, update, { new: true })
         .catch(e => {
            console.log(e);
            throw ApiError.DatabaseError();
         });
   },

};
