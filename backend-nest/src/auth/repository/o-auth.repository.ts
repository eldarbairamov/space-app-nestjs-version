import { Injectable } from "@nestjs/common";
import { FilterQuery, Model, UpdateQuery } from "mongoose";
import { OAuth, OAuthDocument } from "../model";
import { InjectModel } from "@nestjs/mongoose";
import { databaseException } from "@src/common/exception/database.exception";

@Injectable()
export class OAuthRepository {

   constructor(@InjectModel(OAuth.name) private oAuthModel: Model<OAuthDocument>) {
   }

   async create(body): Promise<OAuthDocument> {
      try {
         return await this.oAuthModel.create(body);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         databaseException();
      }
   }

   async deleteOne(filter: FilterQuery<OAuthDocument>) {
      try {
         return await this.oAuthModel.deleteOne(filter);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         databaseException();
      }
   }

   async deleteMany(filter: FilterQuery<OAuthDocument>) {
      try {
         return await this.oAuthModel.deleteMany(filter);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         databaseException();
      }
   }

   async findOne(filter: FilterQuery<OAuth>): Promise<OAuthDocument> {
      try {
         return await this.oAuthModel.findOne(filter);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         databaseException();
      }
   }

   async findByIdAndUpdate(id: string, update: UpdateQuery<OAuth>): Promise<OAuthDocument> {
      try {
         return await this.oAuthModel.findByIdAndUpdate(id, update, { new: true });
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         databaseException();
      }
   }

}