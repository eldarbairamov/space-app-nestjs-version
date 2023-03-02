import { FilterQuery } from "mongoose";
import { IOAuth, OAuthDocument, OAuthModel } from "../model";
import { ApiException } from "../exception/api.exception";
import { DeleteResult } from "mongodb";

export const OAuthRepository = {

   create: async (body: IOAuth): Promise<OAuthDocument> => {
      try {
         return OAuthModel.create(body);
      } catch (e) {
         const error = e as Error
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

   deleteOne: async (filter: FilterQuery<OAuthDocument>): Promise<DeleteResult> => {
      try {
         return OAuthModel.deleteOne(filter);
      } catch (e) {
         const error = e as Error
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

   deleteMany: async (filter: FilterQuery<OAuthDocument>): Promise<DeleteResult> => {
      try {
         return OAuthModel.deleteMany(filter);
      } catch (e) {
         const error = e as Error
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

   findOne: async (filter: FilterQuery<OAuthDocument>): Promise<OAuthDocument | null> => {
      try {
         return OAuthModel.findOne(filter).lean();
      } catch (e) {
         const error = e as Error
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

};