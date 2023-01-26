import { PlanRepository } from "../../repository";
import { allPlansPresenter } from "../../presenter/plan.presenter";

export const getPlansService = async (userId: string) => {

   // Find all plans in DB
   const plans = await PlanRepository.findAll({ planOwnerId: userId });

   // Return presented data for client
   return allPlansPresenter(plans);

};