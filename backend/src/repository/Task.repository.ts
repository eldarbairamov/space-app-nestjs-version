import { ITask, TaskDocument, TaskModel } from "../model";
import { ApiException } from "../exception/api.exception";
import { FilterQuery, UpdateQuery } from "mongoose";

export const TaskRepository = {

   create: async (body: Partial<ITask>): Promise<TaskDocument> => {
      try {
         return TaskModel.create(body);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

   findByIdAndDelete: async (taskId: TaskDocument["id"]): Promise<TaskDocument | null> => {
      try {
         return TaskModel.findByIdAndDelete(taskId);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }

   },

   findByIdAndUpdate: async (taskId: TaskDocument["id"], update: UpdateQuery<ITask>): Promise<TaskDocument | null> => {
      try {
         return TaskModel.findByIdAndUpdate(taskId, update, { new: true });
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }

   },

   find: async (filter: FilterQuery<ITask>): Promise<TaskDocument[]> => {
      try {
         return TaskModel.find(filter);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }

   },

   findById: async (taskId: TaskDocument["id"]): Promise<TaskDocument | null> => {
      try {
         return TaskModel.findById(taskId);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

};