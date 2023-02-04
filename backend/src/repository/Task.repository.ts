import { type ITaskDatabase, type ITaskSchema } from "../interface";
import { TaskModel } from "../model";
import { ApiException } from "../exception/api.exception";
import { type FilterQuery, type UpdateQuery } from "mongoose";

export const TaskRepository = {

   create: async (body: Partial<ITaskSchema>): Promise<ITaskDatabase> => {
      try {
         return TaskModel.create(body);
      } catch (e) {
         throw ApiException.Database(e);
      }
   },

   findByIdAndDelete: async (taskId: string): Promise<ITaskDatabase | null> => {
      try {
         return TaskModel.findByIdAndDelete(taskId);
      } catch (e) {
         throw ApiException.Database(e);
      }

   },

   findByIdAndUpdate: async (taskId: string, update: UpdateQuery<ITaskSchema>): Promise<ITaskDatabase | null> => {
      try {
         return TaskModel.findByIdAndUpdate(taskId, update, { new: true });
      } catch (e) {
         throw ApiException.Database(e);
      }

   },

   find: async (filter: FilterQuery<ITaskSchema>): Promise<ITaskDatabase[]> => {
      try {
         return TaskModel.find(filter);
      } catch (e) {
         throw ApiException.Database(e);
      }

   },

   findById: async (taskId: string): Promise<ITaskDatabase | null> => {
      try {
         return TaskModel.findById(taskId);
      } catch (e) {
         throw ApiException.Database(e);
      }
   },

};