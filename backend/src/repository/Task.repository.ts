import { type ITaskDatabase, type ITaskSchema } from "../interface";
import { TaskModel } from "../model";
import { ApiError } from "../error/Api.error";
import { type FilterQuery, type UpdateQuery } from "mongoose";

export const TaskRepository = {

   create: (body: Partial<ITaskSchema>): Promise<ITaskDatabase> => {
      return TaskModel
         .create(body)
         .catch(e => {
            console.log(e);
            throw ApiError.DatabaseError();
         });
   },

   deleteById: (taskId: string): Promise<ITaskDatabase | null> => {
      return TaskModel
         .findByIdAndDelete(taskId)
         .catch(e => {
            console.log(e);
            throw ApiError.DatabaseError();
         });
   },

   updateById: (taskId: string, update: UpdateQuery<ITaskSchema>): Promise<ITaskDatabase | null> => {
      return TaskModel
         .findByIdAndUpdate(taskId, update, { new: true })
         .catch(e => {
            console.log(e);
            throw ApiError.DatabaseError();
         });
   },

   findAll: (filter: FilterQuery<ITaskSchema>): Promise<ITaskDatabase[]> => {
      return TaskModel
         .find(filter)
         .catch(e => {
            console.log(e);
            throw ApiError.DatabaseError();
         });
   },

};