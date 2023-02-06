import { type IPlan, type PlanDocument, PlanModel, UserDocument } from "../model";
import { ApiException } from "../exception/api.exception";
import { type FilterQuery, type UpdateQuery } from "mongoose";

export const PlanRepository = {

   create: async (body: Partial<IPlan>): Promise<PlanDocument> => {
      try {
         return PlanModel.create(body);
      } catch (e) {
         throw ApiException.Database(e);
      }
   },

   find: async (filter: FilterQuery<IPlan>): Promise<PlanDocument[]> => {
      try {
         return PlanModel.find(filter).sort({ updatedAt: "desc" });
      } catch (e) {
         throw ApiException.Database(e);
      }
   },

   findById: async (planId: PlanDocument["id"]): Promise<PlanDocument | null> => {
      try {
         return PlanModel.findById(planId);
      } catch (e) {
         throw ApiException.Database(e);
      }
   },

   findByIdAndUpdate: async (planId: PlanDocument["id"], update: UpdateQuery<IPlan>): Promise<PlanDocument | null> => {
      try {
         return PlanModel.findByIdAndUpdate(planId, update, { new: true });
      } catch (e) {
         throw ApiException.Database(e);
      }
   },

   findByIdAndDelete: async (planId: PlanDocument["id"]): Promise<PlanDocument | null> => {
      try {
         return PlanModel.findByIdAndDelete(planId);
      } catch (e) {
         throw ApiException.Database(e);
      }
   },

   count: async (userId: UserDocument["id"]): Promise<number> => {
      try {
         return PlanModel.count({ ownerId: userId });
      } catch (e) {
         throw ApiException.Database(e);
      }
   },

};