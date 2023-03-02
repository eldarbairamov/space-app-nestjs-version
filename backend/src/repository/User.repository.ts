import { IUser, UserDocument, UserModel } from "../model";
import { FilterQuery, UpdateQuery } from "mongoose";
import { ApiException } from "../exception/api.exception";

export const UserRepository = {

   create: async (body: Partial<IUser>): Promise<UserDocument> => {
      try {
         return UserModel.create(body);
      } catch (e) {
         const error = e as Error
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

   findOne: async (filter: FilterQuery<IUser>): Promise<UserDocument | null> => {
      try {
         return UserModel.findOne(filter);
      } catch (e) {
         const error = e as Error
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

   findById: async (userId: UserDocument["id"]): Promise<UserDocument | null> => {
      try {
         return UserModel.findById(userId);
      } catch (e) {
         const error = e as Error
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

   findByIdAndUpdate: async (userId: UserDocument["id"], update: UpdateQuery<IUser>): Promise<UserDocument | null> => {
      try {
         return UserModel.findByIdAndUpdate(userId, update, { new: true });
      } catch (e) {
         const error = e as Error
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

};
