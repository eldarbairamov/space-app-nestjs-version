import { type FilterQuery } from "mongoose";
import { type IOAuthDatabase, type IOAuthSchema } from "../interface";
import { OAuthModel } from "../model";
import { ApiException } from "../error/api.expception";
import { type DeleteResult } from "mongodb";

export const OAuthRepository = {

   create: async (body: IOAuthSchema): Promise<IOAuthDatabase> => {
      try {
         return OAuthModel.create(body);
      } catch (e) {
         throw ApiException.Database(e);
      }
   },

   deleteOne: async (filter: FilterQuery<IOAuthSchema>): Promise<DeleteResult> => {
      try {
         return OAuthModel.deleteOne(filter);
      } catch (e) {
         throw ApiException.Database(e);
      }
   },

   findOne: async (filter: FilterQuery<IOAuthSchema>): Promise<IOAuthDatabase | null> => {
      try {
         return OAuthModel.findOne(filter);
      } catch (e) {
         throw ApiException.Database(e);
      }
   },

};