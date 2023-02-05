import { updatePlanValidator } from "../../validator";
import { ApiException } from "../../exception/api.exception";
import { PlanRepository } from "../../repository";
import { type IUpdatePlan } from "../../interface";

export const updatePlanService = async (planId: string, body: IUpdatePlan) => {

   // Validation
   const validation = updatePlanValidator.validate(body);
   if (validation.error) throw new ApiException(validation.error.message, 400);

   // Update note
   await PlanRepository.findByIdAndUpdate(planId, { title: body.title });

};