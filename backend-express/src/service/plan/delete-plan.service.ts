import { PlanRepository, TaskRepository, UserRepository } from "@src/repository";
import { allPlansPresenter } from "@src/presenter";
import { PlanDocument, UserDocument } from "@src/model";
import { IPlansResponse } from "@src/interface";
import { IDeleteItemBody } from "@src/interface/common.interface";

export const deletePlanService = async (body: IDeleteItemBody, planId: PlanDocument["id"], userId: UserDocument["id"]): Promise<IPlansResponse> => {
   // Delete note
   await PlanRepository.findByIdAndDelete(planId);

   // Update user and return updated note list
   const [ plans, count ] = await Promise.all([
      PlanRepository.find({ ownerId: userId }, body.searchKey, body.limit),
      PlanRepository.count({ ownerId: userId }),
      TaskRepository.deleteMany({ planId }),
      UserRepository.findByIdAndUpdate(userId, { $pull: { plansIds: planId } }),
   ]);

   return {
      data: allPlansPresenter(plans),
      count,
   };
};