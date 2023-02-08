import { updatePlanValidator } from "../../validator";
import { ApiException } from "../../exception/api.exception";
import { PlanRepository } from "../../repository";
import { IUpdatePlan } from "../../interface";
import { PlanDocument } from "../../model";

export const updatePlanService = async (planId: PlanDocument["id"], body: IUpdatePlan) => {

   // Validation
   const validation = updatePlanValidator.validate(body);
   if (validation.error) throw new ApiException(validation.error.message, 400);

   // Update note
   await PlanRepository.findByIdAndUpdate(planId, { title: body.title });

};