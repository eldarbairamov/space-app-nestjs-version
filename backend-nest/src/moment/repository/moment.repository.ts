import { Injectable } from "@nestjs/common";
import { databaseException } from "@src/common/exception/database.exception";
import { FilterQuery, Model, UpdateQuery } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Moment, MomentDocument } from "../model/moment.model";
import { UserDocument } from "@src/user/model/user.model";
import { QueryDto } from "@src/common/dto";

@Injectable()
export class MomentRepository {
   constructor(@InjectModel(Moment.name) private momentModel: Model<MomentDocument>) {
   }

   async create(body): Promise<MomentDocument> {
      try {
         return await this.momentModel.create(body);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         databaseException();
      }
   }

   async findById(momentId: MomentDocument["id"]): Promise<MomentDocument> {
      try {
         return await this.momentModel.findById(momentId);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         databaseException();
      }
   }

   async count(filter: FilterQuery<MomentDocument>, searchKey = ""): Promise<number> {
      const filterObj = searchKey ? { ...filter, tags: { $regex: searchKey } } : { ...filter };
      try {
         return await this.momentModel.count(filterObj);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         databaseException();
      }
   }

   async find(filter: FilterQuery<MomentDocument>, queryDto = {} as QueryDto): Promise<MomentDocument[]> {
      const { searchKey, limit } = queryDto;
      const filterObj = searchKey ? { ...filter, tags: { $regex: searchKey } } : { ...filter };
      try {
         return await this.momentModel.find(filterObj).sort({ createdAt: "desc" }).limit(limit);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         databaseException();
      }
   }

   async findAllByUserId(userId: UserDocument["id"]) {
      try {
         return await this.momentModel.find({ ownerId: userId });
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         databaseException();
      }
   }

   async findByIdAndUpdate(momentId: MomentDocument["id"], update: UpdateQuery<MomentDocument>): Promise<MomentDocument> {
      try {
         return await this.momentModel.findByIdAndUpdate(momentId, update, { new: true });
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         databaseException();
      }
   }
}