import { PlanModel } from "../model";
import { ApiError } from "../error/Api.error";
import { type IPlanDatabase, type IPlanSchema } from "../interface";
import { type FilterQuery, type UpdateQuery } from "mongoose";

export const PlanRepository = {

   create: async (body: Partial<IPlanSchema>): Promise<IPlanDatabase> => {
      return PlanModel
         .create(body)
         .catch(e => {
            console.log(e);
            throw ApiError.Database();
         });
   },

   findAll: async (filter: FilterQuery<IPlanSchema>): Promise<IPlanDatabase[]> => {
      return PlanModel
         .find(filter)
         .sort({ updatedAt: "desc" })
         .catch(e => {
            console.log(e);
            throw ApiError.Database();
         });
   },

   findById: (planId: string): Promise<IPlanDatabase | null> => {
      return PlanModel
         .findById(planId)
         .catch(e => {
            console.log(e);
            throw ApiError.Database();
         });
   },

   updateById: async (planId: string, update: UpdateQuery<IPlanSchema>): Promise<IPlanDatabase | null> => {
      return PlanModel
         .findByIdAndUpdate(planId, update, { new: true })
         .catch(e => {
            console.log(e);
            throw ApiError.Database();
         });
   },

   deleteById: async (planId: string): Promise<IPlanDatabase | null> => {
      return PlanModel
         .findByIdAndDelete(planId)
         .catch(e => {
            console.log(e);
            throw ApiError.Database();
         });
   },

   getCount: async (userId: string): Promise<number> => {
      return PlanModel
         .count({ planOwnerId: userId })
         .catch(e => {
            console.log(e);
            throw ApiError.Database();
         });
   },

};