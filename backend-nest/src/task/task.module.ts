import { Module } from "@nestjs/common";
import { TaskController } from "./task.controller";
import { TaskService } from "./task.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Task, TaskSchema } from "./model/task.model";
import { TaskPresenter } from "./presenter/task.presenter";
import { TaskRepository } from "./repository/task.repository";
import { PlanRepository } from "@src/plan/repository/plan.repository";
import { Plan, PlanSchema } from "@src/plan/model/plan.model";

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