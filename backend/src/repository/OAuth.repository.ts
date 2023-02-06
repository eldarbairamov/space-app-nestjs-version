import { FilterQuery } from "mongoose";
import { IOAuth, OAuthDocument, OAuthModel } from "../model";
import { ApiException } from "../exception/api.exception";
import { DeleteResult } from "mongodb";

export const OAuthRepository = {

   create: async (body: IOAuth): Promise<OAuthDocument> => {
      try {
         return OAuthModel.create(body);
      } catch (e) {
         throw ApiException.Database(e);
      }
   },

   deleteOne: async (filter: FilterQuery<IOAuth>): Promise<DeleteResult> => {
      try {
         return OAuthModel.deleteOne(filter);
      } catch (e) {
         throw ApiException.Database(e);
      }
   },

   findOne: async (filter: FilterQuery<IOAuth>): Promise<OAuthDocument | null> => {
      try {
         return OAuthModel.findOne(filter);
      } catch (e) {
         throw ApiException.Database(e);
      }
   },

};