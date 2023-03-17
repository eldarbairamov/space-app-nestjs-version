import { Module } from "@nestjs/common";
import { PlanController } from "./plan.controller";
import { PlanService } from "./plan.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Plan, PlanSchema } from "./model/plan.model";
import { User, UserSchema } from "../user/model/user.model";
import { PlanPresenter } from "./presenter/plan.presenter";
import { UserRepository } from "../user/repository/user.repository";
import { PlanRepository } from "./repository/plan.repository";
import { TaskRepository } from "../task/repository/task.repository";
import { Task, TaskSchema } from "../task/model/task.model";

@Module({

   imports: [ MongooseModule.forFeature([
      { name: Plan.name, schema: PlanSchema },
      { name: User.name, schema: UserSchema },
      { name: Task.name, schema: TaskSchema }
   ]) ],

   controllers: [ PlanController ],

   providers: [ PlanService, PlanPresenter, UserRepository, PlanRepository, TaskRepository ],

})
export class PlanModule {

}