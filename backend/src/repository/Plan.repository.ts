import { IPlan, PlanDocument, PlanModel } from "../model";
import { ApiException } from "../exception/api.exception";
import { FilterQuery, UpdateQuery } from "mongoose";

export const PlanRepository = {

   create: async (body: Partial<IPlan>): Promise<PlanDocument> => {
      try {
         return PlanModel.create(body);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

   find: async (filter: FilterQuery<IPlan>, searchKey: string, limit: string | number): Promise<PlanDocument[]> => {
      const filterObj = searchKey ? { ...filter, title: { $regex: searchKey, $options: "i" } } : { ...filter };
      try {
         return PlanModel.find(filterObj).sort({ updatedAt: "desc" }).limit(Number(limit));
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

   findById: async (planId: PlanDocument["id"]): Promise<PlanDocument | null> => {
      try {
         return PlanModel.findById(planId);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

   findByIdAndUpdate: async (planId: PlanDocument["id"], update: UpdateQuery<IPlan>): Promise<PlanDocument | null> => {
      try {
         return PlanModel.findByIdAndUpdate(planId, update, { new: true });
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

   findOneAndUpdate: async (filter: FilterQuery<IPlan>, update: UpdateQuery<IPlan>): Promise<PlanDocument | null> => {
      try {
         return PlanModel.findOneAndUpdate(filter, update, { new: true });
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

   findByIdAndDelete: async (planId: PlanDocument["id"]): Promise<PlanDocument | null> => {
      try {
         return PlanModel.findByIdAndDelete(planId);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

   count: async (filter: FilterQuery<IPlan>, searchKey = ""): Promise<number> => {
      const filterObj = searchKey ? { ...filter, title: { $regex: searchKey, $options: "i" } } : { ...filter };
      try {
         return PlanModel.count(filterObj);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

};