import { Injectable } from "@nestjs/common";
import { FilterQuery, Model, UpdateQuery } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { ActionToken, ActionTokenDocument } from "@src/auth/model";
import { databaseException } from "@src/common/exception/database.exception";

@Injectable()
export class ActionTokenRepository {

   constructor(@InjectModel(ActionToken.name) private actionTokenModel: Model<ActionTokenDocument>) {
   }

   async create(body): Promise<ActionTokenDocument> {
      try {
         return await this.actionTokenModel.create(body);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         databaseException();
      }
   }

   async findByIdAndUpdate(id: string, update: UpdateQuery<ActionToken>): Promise<ActionTokenDocument> {
      try {
         return await this.actionTokenModel.findByIdAndUpdate(id, update, { new: true });
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         databaseException();
      }
   }

   async findOneAndDelete(filter: FilterQuery<ActionToken>): Promise<ActionTokenDocument> {
      try {
         return await this.actionTokenModel.findOneAndDelete(filter);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         databaseException();
      }
   }

}