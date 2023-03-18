import { Module } from "@nestjs/common";
import { PlanController } from "./plan.controller";
import { PlanService } from "./plan.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Plan, PlanSchema } from "./model/plan.model";
import { PlanPresenter } from "./presenter/plan.presenter";
import { PlanRepository } from "./repository/plan.repository";
import { Task, TaskSchema } from "@src/task/model/task.model";
import { UserRepository } from "@src/user/repository/user.repository";
import { TaskRepository } from "@src/task/repository/task.repository";
import { User, UserSchema } from "@src/user/model/user.model";

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