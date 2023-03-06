import { PlanRepository } from "../../repository";
import { IDeleteItemBody } from "../../interface/common.interface";
import { PlanDocument, UserDocument } from "../../model";
import { IPlansResponse } from "../../interface";
import { allPlansPresenter } from "../../presenter";

export const deletePlanService = async (body: IDeleteItemBody, planId: PlanDocument["id"], userId: UserDocument["id"]): Promise<IPlansResponse> => {
   // Delete note
   await PlanRepository.findByIdAndDelete(planId);

   // Update user and return updated note list
   const [ plans, count ] = await Promise.all([
      PlanRepository.find({ ownerId: userId }, body.searchKey, body.limit),
      PlanRepository.count({ ownerId: userId }),
      PlanRepository.findByIdAndUpdate(userId, { $pull: { plansIds: planId } }),
   ]);

   return {
      data: allPlansPresenter(plans),
      count,
   };
};