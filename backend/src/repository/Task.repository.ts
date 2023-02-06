import { ITask, TaskDocument, TaskModel } from "../model";
import { ApiException } from "../exception/api.exception";
import { FilterQuery, UpdateQuery } from "mongoose";

export const TaskRepository = {

   create: async (body: Partial<ITask>): Promise<TaskDocument> => {
      try {
         return TaskModel.create(body);
      } catch (e) {
         throw ApiException.Database(e);
      }
   },

   findByIdAndDelete: async (taskId: TaskDocument["id"]): Promise<TaskDocument | null> => {
      try {
         return TaskModel.findByIdAndDelete(taskId);
      } catch (e) {
         throw ApiException.Database(e);
      }

   },

   findByIdAndUpdate: async (taskId: TaskDocument["id"], update: UpdateQuery<ITask>): Promise<TaskDocument | null> => {
      try {
         return TaskModel.findByIdAndUpdate(taskId, update, { new: true });
      } catch (e) {
         throw ApiException.Database(e);
      }

   },

   find: async (filter: FilterQuery<ITask>): Promise<TaskDocument[]> => {
      try {
         return TaskModel.find(filter);
      } catch (e) {
         throw ApiException.Database(e);
      }

   },

   findById: async (taskId: TaskDocument["id"]): Promise<TaskDocument | null> => {
      try {
         return TaskModel.findById(taskId);
      } catch (e) {
         throw ApiException.Database(e);
      }
   },

};