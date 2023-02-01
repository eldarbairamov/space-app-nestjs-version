import { PlanRepository, UserRepository } from "../../repository";
import { planPresenter } from "../../presenter/plan.presenter";
import { type IPlanDto } from "../../interface";

export const addPlanService = async (userId: string): Promise<IPlanDto> => {

   // Save plan to DB
   const plan = await PlanRepository.create({ ownerId: userId });

   // Update user
   await UserRepository.updateById(userId, { $push: { plansIds: plan._id } });

   // Return presented data to client
   return planPresenter(plan);

};