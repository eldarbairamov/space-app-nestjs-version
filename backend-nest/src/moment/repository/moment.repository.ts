import { Injectable } from "@nestjs/common";
import { databaseException } from "../../common/exception/database.exception";
import { FilterQuery, Model, UpdateQuery } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Moment, MomentDocument } from "../model/moment.model";
import { UserDocument } from "../../user/model/user.model";

@Injectable()
export class MomentRepository {
   constructor(@InjectModel(Moment.name) private momentModel: Model<MomentDocument>) {
   }

   async create(body): Promise<MomentDocument> {
      try {
         return this.momentModel.create(body);
      } catch (e) {
         const error = e as Error
         console.log(error.message);
         databaseException(e);
      }
   }

   async findById(momentId: MomentDocument["id"]): Promise<MomentDocument> {
      try {
         return this.momentModel.findById(momentId);
      } catch (e) {
         const error = e as Error
         console.log(error.message);
         databaseException(e);
      }
   }

   async count(filter: FilterQuery<MomentDocument>): Promise<number> {
      try {
         return this.momentModel.count(filter);
      } catch (e) {
         const error = e as Error
         console.log(error.message);
         databaseException(e);
      }
   }

   async find(filter: FilterQuery<MomentDocument>, searchKey: string): Promise<MomentDocument[]> {
      const filterObj = searchKey ? { ...filter, tags: { $in: searchKey } } : { ...filter };
      try {
         return this.momentModel.find(filterObj).sort({ createdAt: "desc" });
      } catch (e) {
         const error = e as Error
         console.log(error.message);
         databaseException(e);
      }
   }

   async findAllByUserId(userId: UserDocument["id"]) {
      try {
         return this.momentModel.find({ ownerId: userId });
      } catch (e) {
         const error = e as Error
         console.log(error.message);
         databaseException(e);
      }
   }

   async findByIdAndUpdate(momentId: MomentDocument["id"], update: UpdateQuery<MomentDocument>): Promise<MomentDocument> {
      try {
         return this.momentModel.findByIdAndUpdate(momentId, update, { new: true });
      } catch (e) {
         const error = e as Error
         console.log(error.message);
         databaseException(e);
      }
   }

   async findByIdAndDelete(momentId: MomentDocument["id"]): Promise<MomentDocument> {
      try {
         return this.momentModel.findByIdAndDelete(momentId);
      } catch (e) {
         const error = e as Error
         console.log(error.message);
         databaseException(e);
      }
   }
}