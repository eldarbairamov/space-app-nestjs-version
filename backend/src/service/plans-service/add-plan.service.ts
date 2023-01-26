import { PlanRepository } from "../../repository";
import { planPresenter } from "../../presenter/plan.presenter";

export const addPlanService = async (userId: string) => {

   // Save plan to DB
   const plan = await PlanRepository.create({ planOwnerId: userId });

   // Return presented data for client
   return planPresenter(plan);

};