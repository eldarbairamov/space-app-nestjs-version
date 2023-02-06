import { FilterQuery } from "mongoose";
import { ActionTokenDocument, ActionTokenModel, IActionToken } from "../model";
import { ApiException } from "../exception/api.exception";

export const ActionTokenRepository = {

   create: async (body: IActionToken): Promise<ActionTokenDocument> => {
      try {
         return ActionTokenModel.create(body);
      } catch (e) {
         throw ApiException.Database(e);
      }
   },

   findOneAndDelete: async (filter: FilterQuery<IActionToken>): Promise<ActionTokenDocument | null> => {
      try {
         return ActionTokenModel.findOneAndDelete(filter);
      } catch (e) {
         throw ApiException.Database(e);
      }
   },

};