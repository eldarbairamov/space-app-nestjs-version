import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, UpdateQuery } from "mongoose";
import { databaseException } from "../../common/exception/database.exception";
import { Plan, PlanDocument } from "../model/plan.model";
import { QueryDto } from "../../common/dto/query.dto";

@Injectable()
export class PlanRepository {

   constructor(@InjectModel(Plan.name) private planModel: Model<PlanDocument>) {
   }

   async create(body): Promise<PlanDocument> {
      try {
         return this.planModel.create(body);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         databaseException();
      }
   }

   async findById(planId: PlanDocument["id"]): Promise<PlanDocument> {
      try {
         return this.planModel.findById(planId);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         databaseException();
      }
   }

   async count(filter: FilterQuery<Plan>, searchKey = ""): Promise<number> {
      const filterObj = searchKey ? { ...filter, title: { $in: searchKey } } : { ...filter };
      try {
         return this.planModel.count(filterObj);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         databaseException();
      }
   }

   async find(filter: FilterQuery<Plan>, queryDto = {} as QueryDto): Promise<PlanDocument[]> {
      const { searchKey, limit } = queryDto;
      const filterObj = searchKey ? { ...filter, title: { $regex: searchKey, $options: "i" } } : { ...filter };
      try {
         return this.planModel.find(filterObj).sort({ updatedAt: "desc" }).limit(limit);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         databaseException();
      }
   }

   async findByIdAndUpdate(planId: PlanDocument["id"], update: UpdateQuery<Plan>): Promise<PlanDocument> {
      try {
         return this.planModel.findByIdAndUpdate(planId, update, { new: true });
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         databaseException();
      }
   }

   async findOneAndUpdate(filter: FilterQuery<Plan>, update: UpdateQuery<Plan>): Promise<PlanDocument> {
      try {
         return this.planModel.findOneAndUpdate(filter, update, { new: true });
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         databaseException();
      }
   }

   async findByIdAndDelete(planId: PlanDocument["id"]) {
      try {
         return this.planModel.findByIdAndDelete(planId);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         databaseException();
      }
   }

}