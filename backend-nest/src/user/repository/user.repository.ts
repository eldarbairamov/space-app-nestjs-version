import { FilterQuery, Model, UpdateQuery } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { databaseException } from "@src/common/exception/database.exception";
import { User, UserDocument } from "@src/user/model/user.model";

@Injectable()
export class UserRepository {

   constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
   }

   async create(body): Promise<UserDocument> {
      try {
         return await this.userModel.create(body);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         databaseException();
      }
   }

   async findById(userId: UserDocument["id"]): Promise<UserDocument> {
      try {
         return await this.userModel.findById(userId);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         databaseException();
      }
   }

   async findOne(filter: FilterQuery<User>): Promise<UserDocument> {
      try {
         return await this.userModel.findOne(filter);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         databaseException();
      }
   }

   async findByIdAndUpdate(userId: UserDocument["id"], update: UpdateQuery<User>): Promise<UserDocument> {
      try {
         return await this.userModel.findByIdAndUpdate(userId, update, { new: true });
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         databaseException();
      }
   }


}