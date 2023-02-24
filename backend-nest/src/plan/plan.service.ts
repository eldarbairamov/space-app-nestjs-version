import { Injectable } from "@nestjs/common";
import { PlanPresenter } from "./presenter/plan.presenter";
import { UserRepository } from "../user/repository/user.repository";
import { PlanRepository } from "./repository/plan.repository";
import { CreatePlanDto } from "./dto";
import { IPlanResponse } from "./interface/plan-response.interface";
import { UserDocument } from "../user/model/user.model";
import { PlanDocument } from "./model/plan.model";

@Injectable()
export class PlanService {

   constructor(
      private planPresenter: PlanPresenter,
      private userRepository: UserRepository,
      private planRepository: PlanRepository) {
   }

   async addPlan(userId: UserDocument["id"]): Promise<IPlanResponse> {
      // Create plan
      const plan = await this.planRepository.create({ ownerId: userId });

      // Update note
      await this.userRepository.findByIdAndUpdate(userId, { $push: { plansIds: plan.id } });

      // Return presented data to client
      return this.planPresenter.single(plan);
   }

   async updatePlan(planId: PlanDocument["id"], dto: CreatePlanDto): Promise<IPlanResponse> {
      // Update plan
      const plan = await this.planRepository.findByIdAndUpdate(planId, dto);

      // Return presented data to client
      return this.planPresenter.single(plan);
   }

   async getPlans(userId: UserDocument["id"], searchKey: string): Promise<IPlanResponse[]> {
      // Find plans
      const plans = await this.planRepository.find({ ownerId: userId }, searchKey);

      // Return presented data to client
      return this.planPresenter.array(plans);
   }

   async deletePlan(planId: PlanDocument["id"], userId: string): Promise<void> {
      // Delete plan
      await this.planRepository.findByIdAndDelete(planId);

      // Update user
      await this.userRepository.findByIdAndUpdate(userId, { $pull: { plansIds: planId } });
   }


}