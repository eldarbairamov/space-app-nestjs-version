import { IUser, UserDocument, UserModel } from "../model";
import { FilterQuery, UpdateQuery } from "mongoose";
import { ApiException } from "../exception/api.exception";

export const UserRepository = {

   create: async (body: Partial<IUser>): Promise<UserDocument> => {
      try {
         return UserModel.create(body);
      } catch (e) {
         throw ApiException.Database(e);
      }
   },

   findOne: async (filter: FilterQuery<IUser>): Promise<UserDocument | null> => {
      try {
         return UserModel.findOne(filter);
      } catch (e) {
         throw ApiException.Database(e);
      }
   },

   findById: async (userId: UserDocument["id"]): Promise<UserDocument | null> => {
      try {
         return UserModel.findById(userId);
      } catch (e) {
         throw ApiException.Database(e);
      }
   },

   findByIdAndUpdate: async (userId: UserDocument["id"], update: UpdateQuery<IUser>): Promise<UserDocument | null> => {
      try {
         return UserModel.findByIdAndUpdate(userId, update, { new: true });
      } catch (e) {
         throw ApiException.Database(e);
      }
   },

};
