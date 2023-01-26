import { PlanModel } from "../model";
import { ApiError } from "../error/Api.error";
import { type IPlanDatabase, type IPlanSchema } from "../interface";
import { type FilterQuery, type HydratedDocument, Types, type UpdateQuery } from "mongoose";

export const planRepository = {

   create: async (body: Partial<IPlanSchema>): Promise<IPlanDatabase> => {
      return PlanModel
         .create(body)
         .catch(e => {
            console.log(e);
            throw new ApiError("Помилка при роботі з базою даних", 500);
         });
   },

   findAll: async (filter: FilterQuery<IPlanDatabase>): Promise<HydratedDocument<IPlanDatabase> | null> => {
      return PlanModel
         .findOne(filter)
         .catch(e => {
            console.log(e);
            throw new ApiError("Помилка при роботі з базою даних", 500);
         });
   },

   findByIdAndUpdate: async (id: string, update: UpdateQuery<IPlanSchema>): Promise<IPlanDatabase | null> => {
      return PlanModel
         .findByIdAndUpdate(id, update, { new: true })
         .catch(e => {
            console.log(e);
            throw new ApiError("Помилка при роботі з базою даних", 500);
         });
   },

   deleteById: async (id: string) => {
      return PlanModel
         .findByIdAndDelete(id)
         .catch(e => {
            console.log(e);
            throw new ApiError("Помилка при роботі з базою даних", 500);
         });
   },

};