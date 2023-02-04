import { UserModel } from "../model";
import { type FilterQuery, type UpdateQuery } from "mongoose";
import { type IUserDatabase, type IUserSchema } from "../interface";
import { ApiException } from "../exception/api.exception";

export const UserRepository = {

   create: async (body: Partial<IUserSchema>): Promise<IUserDatabase> => {
      try {
         return UserModel.create(body);
      } catch (e) {
         throw ApiException.Database(e);
      }
   },

   findOne: async (filter: FilterQuery<IUserDatabase>): Promise<IUserDatabase | null> => {
      try {
         return UserModel.findOne(filter);
      } catch (e) {
         throw ApiException.Database(e);
      }
   },

   findById: async (id: string): Promise<IUserDatabase | null> => {
      try {
         return UserModel.findById(id);
      } catch (e) {
         throw ApiException.Database(e);
      }
   },

   findByIdAndUpdate: async (userId: string, update: UpdateQuery<IUserSchema>): Promise<IUserDatabase | null> => {
      try {
         return UserModel.findByIdAndUpdate(userId, update, { new: true });
      } catch (e) {
         throw ApiException.Database(e);
      }
   },

};
