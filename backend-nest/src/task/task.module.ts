import { Module } from "@nestjs/common";
import { TaskController } from "./task.controller";
import { TaskService } from "./task.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Task, TaskSchema } from "./model/task.model";
import { TaskPresenter } from "./presenter/task.presenter";
import { Plan, PlanSchema } from "../plan/model/plan.model";
import { TaskRepository } from "./repository/task.repository";
import { PlanRepository } from "../plan/repository/plan.repository";

@Module({

   imports: [ MongooseModule.forFeature([
      { name: Task.name, schema: TaskSchema },
      { name: Plan.name, schema: PlanSchema },
   ]) ],

   providers: [ TaskService, TaskPresenter, TaskRepository, PlanRepository ],

   controllers: [ TaskController ],

})
export class TaskModule {

}