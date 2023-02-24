import { Injectable } from "@nestjs/common";
import { FilterQuery, Model, UpdateQuery } from "mongoose";
import { ActionToken, ActionTokenDocument } from "../model";
import { InjectModel } from "@nestjs/mongoose";
import { databaseException } from "../../common/exception/database.exception";

@Injectable()
export class ActionTokenRepository {

   constructor(@InjectModel(ActionToken.name) private actionTokenModel: Model<ActionTokenDocument>) {
   }

   async create(body): Promise<ActionTokenDocument> {
      try {
         return await this.actionTokenModel.create(body);
      } catch (e) {
         databaseException(e);
      }
   }

   async findByIdAndUpdate(id: string, update: UpdateQuery<ActionToken>): Promise<ActionTokenDocument> {
      try {
         return await this.actionTokenModel.findByIdAndUpdate(id, update);
      } catch (e) {
         databaseException(e);
      }
   }

   async findOneAndDelete(filter: FilterQuery<ActionToken>): Promise<ActionTokenDocument> {
      try {
         return await this.actionTokenModel.findOneAndDelete(filter);
      } catch (e) {
         databaseException(e);
      }
   }

}