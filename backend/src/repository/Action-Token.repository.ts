import { type FilterQuery } from "mongoose";
import { type IActionTokenDatabase, type IActionTokenSchema } from "../interface";
import { ActionTokenModel } from "../model";
import { ApiException } from "../exception/api.exception";

export const ActionTokenRepository = {

   create: async (body: IActionTokenSchema): Promise<IActionTokenDatabase> => {
      try {
         return ActionTokenModel.create(body);
      } catch (e) {
         throw ApiException.Database(e);
      }
   },

   findOneAndDelete: async (filter: FilterQuery<IActionTokenSchema>): Promise<IActionTokenDatabase | null> => {
      try {
         return ActionTokenModel.findOneAndDelete(filter);
      } catch (e) {
         throw ApiException.Database(e);
      }
   },

};