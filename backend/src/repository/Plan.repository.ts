import { PlanModel } from "../model";
import { ApiException } from "../error/api.exception";
import { type IPlanDatabase, type IPlanSchema } from "../interface";
import { type FilterQuery, type UpdateQuery } from "mongoose";

export const PlanRepository = {

   create: async (body: Partial<IPlanSchema>): Promise<IPlanDatabase> => {
      try {
         return PlanModel.create(body);
      } catch (e) {
         throw ApiException.Database(e);
      }
   },

   find: async (filter: FilterQuery<IPlanSchema>): Promise<IPlanDatabase[]> => {
      try {
         return PlanModel.find(filter).sort({ updatedAt: "desc" });
      } catch (e) {
         throw ApiException.Database(e);
      }
   },

   findById: async (planId: string): Promise<IPlanDatabase | null> => {
      try {
         return PlanModel.findById(planId);
      } catch (e) {
         throw ApiException.Database(e);
      }
   },

   findByIdAndUpdate: async (planId: string, update: UpdateQuery<IPlanSchema>): Promise<IPlanDatabase | null> => {
      try {
         return PlanModel.findByIdAndUpdate(planId, update, { new: true });
      } catch (e) {
         throw ApiException.Database(e);
      }
   },

   findByIdAndDelete: async (planId: string): Promise<IPlanDatabase | null> => {
      try {
         return PlanModel.findByIdAndDelete(planId);
      } catch (e) {
         throw ApiException.Database(e);
      }
   },

   count: async (userId: string): Promise<number> => {
      try {
         return PlanModel.count({ ownerId: userId });
      } catch (e) {
         throw ApiException.Database(e);
      }
   },

};