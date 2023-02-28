import { Injectable } from "@nestjs/common";
import { FilterQuery, Model, UpdateQuery } from "mongoose";
import { OAuth, OAuthDocument } from "../model";
import { InjectModel } from "@nestjs/mongoose";
import { databaseException } from "../../common/exception/database.exception";

@Injectable()
export class OAuthRepository {

   constructor(@InjectModel(OAuth.name) private oAuthModel: Model<OAuthDocument>) {
   }

   async create(body): Promise<OAuthDocument> {
      try {
         return this.oAuthModel.create(body);
      } catch (e) {
         const error = e as Error
         console.log(error.message);
         databaseException(e);
      }
   }

   async deleteOne(filter: FilterQuery<OAuthDocument>) {
      try {
         return this.oAuthModel.deleteOne(filter);
      } catch (e) {
         const error = e as Error
         console.log(error.message);
         databaseException(e);
      }
   }

   async findOne(filter: FilterQuery<OAuth>): Promise<OAuthDocument> {
      try {
         return await this.oAuthModel.findOne(filter);
      } catch (e) {
         const error = e as Error
         console.log(error.message);
         databaseException(e);
      }
   }

   async findByIdAndUpdate(id: string, update: UpdateQuery<OAuth>): Promise<OAuthDocument> {
      try {
         return this.oAuthModel.findByIdAndUpdate(id, update, { new: true });
      } catch (e) {
         const error = e as Error
         console.log(error.message);
         databaseException(e);
      }
   }

}