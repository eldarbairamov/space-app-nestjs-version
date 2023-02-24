import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, UpdateQuery } from "mongoose";
import { databaseException } from "../../common/exception/database.exception";
import { Plan, PlanDocument } from "../model/plan.model";

@Injectable()
export class PlanRepository {

   constructor(@InjectModel(Plan.name) private planModel: Model<PlanDocument>) {
   }

   async create(body): Promise<PlanDocument> {
      try {
         return this.planModel.create(body);
      } catch (e) {
         databaseException(e);
      }
   }

   async findById(planId: PlanDocument["id"]): Promise<PlanDocument> {
      try {
         return this.planModel.findById(planId);
      } catch (e) {
         databaseException(e);
      }
   }

   async count(filter: FilterQuery<Plan>): Promise<number> {
      try {
         return this.planModel.count(filter);
      } catch (e) {
         databaseException(e);
      }
   }

   async find(filter: FilterQuery<Plan>, searchKey: string): Promise<PlanDocument[]> {
      const filterObj = searchKey ? { ...filter, title: { $regex: searchKey, $options: "i" } } : { ...filter };
      try {
         return this.planModel.find(filterObj).sort({ updatedAt: "desc" });
      } catch (e) {
         databaseException(e);
      }
   }

   async findByIdAndUpdate(planId: PlanDocument["id"], update: UpdateQuery<Plan>): Promise<PlanDocument> {
      try {
         return this.planModel.findByIdAndUpdate(planId, update, { new: true });
      } catch (e) {
         databaseException(e);
      }
   }

   async findOneAndUpdate(filter: FilterQuery<Plan>, update: UpdateQuery<Plan>): Promise<PlanDocument> {
      try {
         return this.planModel.findOneAndUpdate(filter, update);
      } catch (e) {
         databaseException(e);
      }
   }

   async findByIdAndDelete(planId: PlanDocument["id"]): Promise<PlanDocument> {
      try {
         return this.planModel.findByIdAndDelete(planId);
      } catch (e) {
         databaseException(e);
      }
   }

}