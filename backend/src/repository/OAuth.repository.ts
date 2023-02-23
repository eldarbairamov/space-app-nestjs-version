import { FilterQuery } from "mongoose";
import { IOAuth, OAuthDocument, OAuthModel } from "../model";
import { ApiException } from "../exception/api.exception";
import { DeleteResult } from "mongodb";

export const OAuthRepository = {

   create: async (body: IOAuth): Promise<OAuthDocument> => {
      try {
         return OAuthModel.create(body);
      } catch (e) {
         throw ApiException.DatabaseError(e);
      }
   },

   deleteOne: async (filter: FilterQuery<OAuthDocument>): Promise<DeleteResult> => {
      try {
         return OAuthModel.deleteOne(filter);
      } catch (e) {
         throw ApiException.DatabaseError(e);
      }
   },

   deleteMany: async (filter: FilterQuery<OAuthDocument>): Promise<DeleteResult> => {
      try {
         return OAuthModel.deleteMany(filter);
      } catch (e) {
         throw ApiException.DatabaseError(e);
      }
   },

   findOne: async (filter: FilterQuery<OAuthDocument>): Promise<OAuthDocument | null> => {
      try {
         return OAuthModel.findOne(filter).lean();
      } catch (e) {
         throw ApiException.DatabaseError(e);
      }
   },

};