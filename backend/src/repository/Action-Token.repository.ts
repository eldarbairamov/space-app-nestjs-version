import { FilterQuery } from "mongoose";
import { ActionTokenDocument, ActionTokenModel, IActionToken } from "../model";
import { ApiException } from "../exception/api.exception";

export const ActionTokenRepository = {

   create: async (body: IActionToken): Promise<ActionTokenDocument> => {
      try {
         return ActionTokenModel.create(body);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError(e);
      }
   },

   findOneAndDelete: async (filter: FilterQuery<IActionToken>): Promise<ActionTokenDocument | null> => {
      try {
         return ActionTokenModel.findOneAndDelete(filter);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError(e);
      }
   },

};