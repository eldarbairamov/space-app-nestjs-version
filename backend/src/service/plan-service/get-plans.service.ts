import { PlanRepository } from "../../repository";
import { allPlansPresenter } from "../../presenter/plan.presenter";
import { type IPlanDto } from "../../interface";

export const getPlansService = async (userId: string): Promise<IPlanDto[]> => {

   // Find all plans in DB
   const plans = await PlanRepository.findAll({ ownerId: userId });

   // Return presented data to client
   return allPlansPresenter(plans);

};