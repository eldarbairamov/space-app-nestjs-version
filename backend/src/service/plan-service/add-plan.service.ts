import { PlanRepository, UserRepository } from "../../repository";
import { planPresenter } from "../../presenter/plan.presenter";
import { PlanDto } from "../../dto/plan.dto";

export const addPlanService = async (userId: string): Promise<PlanDto> => {

   // Save plan to DB
   const plan = await PlanRepository.create({ ownerId: userId });

   // Update user
   await UserRepository.findByIdAndUpdate(userId, { $push: { plansIds: plan._id } });

   // Return presented data to client
   return planPresenter(plan);

};