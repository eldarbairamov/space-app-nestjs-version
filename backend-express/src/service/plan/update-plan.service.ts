import { updatePlanValidator } from "../../validator";
import { ApiException } from "../../exception/api.exception";
import { PlanRepository } from "../../repository";
import { PlanDocument } from "../../model";

export const updatePlanService = async (planId: PlanDocument["id"], body: { title: string }) => {

   // Validation
   const validation = updatePlanValidator.validate(body);
   if (validation.error) throw new ApiException(validation.error.message, 400);

   // Update note
   await PlanRepository.findByIdAndUpdate(planId, { title: body.title });

};