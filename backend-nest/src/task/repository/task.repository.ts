import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, UpdateQuery } from "mongoose";
import { databaseException } from "../../common/exception/database.exception";
import { Task, TaskDocument } from "../model/task.model";

@Injectable()
export class TaskRepository {

   constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {
   }

   async create(body): Promise<TaskDocument> {
      try {
         return this.taskModel.create(body);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         databaseException();
      }
   }

   async findById(taskId: TaskDocument["id"]): Promise<TaskDocument> {
      try {
         return this.taskModel.findById(taskId);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         databaseException();
      }
   }

   async find(filter: FilterQuery<Task>): Promise<TaskDocument[]> {
      try {
         return this.taskModel.find(filter);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         databaseException();
      }
   }

   async findByIdAndUpdate(taskId: TaskDocument["id"], update: UpdateQuery<Task>): Promise<TaskDocument> {
      try {
         return this.taskModel.findByIdAndUpdate(taskId, update, { new: true });
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         databaseException();
      }
   }

   async findByIdAndDelete(taskId: TaskDocument["id"]) {
      try {
         return this.taskModel.findByIdAndDelete(taskId);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         databaseException();
      }
   }

}