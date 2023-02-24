import { Module } from "@nestjs/common";
import { PlanController } from "./plan.controller";
import { PlanService } from "./plan.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Plan, PlanSchema } from "./model/plan.model";
import { User, UserSchema } from "../user/model/user.model";
import { PlanPresenter } from "./presenter/plan.presenter";
import { UserRepository } from "../user/repository/user.repository";
import { PlanRepository } from "./repository/plan.repository";

@Module({

   imports: [ MongooseModule.forFeature([
      { name: Plan.name, schema: PlanSchema },
      { name: User.name, schema: UserSchema },
   ]) ],

   controllers: [ PlanController ],

   providers: [ PlanService, PlanPresenter, UserRepository, PlanRepository ],

})
export class PlanModule {

}