import { IPlan, PlanDocument, PlanModel, UserDocument } from "../model";
import { ApiException } from "../exception/api.exception";
import { FilterQuery, UpdateQuery } from "mongoose";
import { IQuery } from "../interface";

export const PlanRepository = {

   create: async (body: Partial<IPlan>): Promise<PlanDocument> => {
      try {
         return PlanModel.create(body);
      } catch (e) {
         throw ApiException.DatabaseError(e);
      }
   },

   find: async (filter: FilterQuery<IPlan>, query: IQuery): Promise<PlanDocument[]> => {
      try {
         const { limit = 20, page = 1, searchKey } = query;
         const filterObj = searchKey ? { ...filter, title: { $regex: searchKey, $options: "i" } } : { ...filter };

         return PlanModel.find(filterObj).limit(+limit).skip((+page - 1) * +limit).sort({ updatedAt: "desc" });
      } catch (e) {
         throw ApiException.DatabaseError(e);
      }
   },

   findById: async (planId: PlanDocument["id"]): Promise<PlanDocument | null> => {
      try {
         return PlanModel.findById(planId);
      } catch (e) {
         throw ApiException.DatabaseError(e);
      }
   },

   findByIdAndUpdate: async (planId: PlanDocument["id"], update: UpdateQuery<IPlan>): Promise<PlanDocument | null> => {
      try {
         return PlanModel.findByIdAndUpdate(planId, update, { new: true });
      } catch (e) {
         throw ApiException.DatabaseError(e);
      }
   },

   findByIdAndDelete: async (planId: PlanDocument["id"]): Promise<PlanDocument | null> => {
      try {
         return PlanModel.findByIdAndDelete(planId);
      } catch (e) {
         throw ApiException.DatabaseError(e);
      }
   },

   count: async (userId: UserDocument["id"]): Promise<number> => {
      try {
         return PlanModel.count({ ownerId: userId });
      } catch (e) {
         throw ApiException.DatabaseError(e);
      }
   },

};