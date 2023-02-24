import { FilterQuery, Model, UpdateQuery } from "mongoose";
import { User, UserDocument } from "../model/user.model";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { databaseException } from "../../common/exception/database.exception";

@Injectable()
export class UserRepository {

   constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
   }

   async create(body): Promise<UserDocument> {
      try {
         return this.userModel.create(body);
      } catch (e) {
         databaseException(e);
      }
   }

   async findById(userId: UserDocument["id"]): Promise<UserDocument> {
      try {
         return this.userModel.findById(userId);
      } catch (e) {
         databaseException(e);
      }
   }

   async findOne(filter: FilterQuery<User>): Promise<UserDocument> {
      try {
         return this.userModel.findOne(filter);
      } catch (e) {
         databaseException(e);
      }
   }

   async findByIdAndUpdate(userId: UserDocument["id"], update: UpdateQuery<User>): Promise<UserDocument> {
      try {
         return this.userModel.findByIdAndUpdate(userId, update, { new: true });
      } catch (e) {
         databaseException(e);
      }
   }


}