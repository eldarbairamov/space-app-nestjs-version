import { PlanDocument } from "../../model";
import { PlanRepository } from "../../repository";
import { planPresenter } from "../../presenter";
import { IPlanResponse } from "../../interface";

export const getOnePlanService = async (planId: PlanDocument["id"]): Promise<IPlanResponse> => {

   // Find plan in DB
   const plan = await PlanRepository.findById(planId) as PlanDocument;

   // Return presented data to client
   return planPresenter(plan);

};