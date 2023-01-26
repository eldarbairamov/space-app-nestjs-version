import { type FilterQuery } from "mongoose";
import { type IOAuthDatabase, type IOAuthSchema } from "../interface";
import { OAuthModel } from "../model";
import { ApiError } from "../error/Api.error";
import { type DeleteResult } from "mongodb";

export const OAuthRepository = {

   create: async (body: IOAuthSchema): Promise<IOAuthDatabase> => {
      return OAuthModel
         .create(body)
         .catch(e => {
            console.log(e);
            throw ApiError.DatabaseError();
         });
   },

   delete: async (filter: FilterQuery<IOAuthSchema>): Promise<DeleteResult | void> => {
      return OAuthModel
         .deleteOne(filter)
         .catch(e => {
            console.log(e);
            throw ApiError.DatabaseError();
         });
   },

   findOne: async (filter: FilterQuery<IOAuthSchema>): Promise<IOAuthDatabase | null> => {
      return OAuthModel
         .findOne(filter)
         .catch(e => {
            console.log(e);
            throw ApiError.DatabaseError();
         });
   },

};