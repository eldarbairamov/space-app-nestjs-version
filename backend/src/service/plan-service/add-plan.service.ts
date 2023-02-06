import { PlanRepository, UserRepository } from "../../repository";
import { planPresenter } from "../../presenter";
import { IPlanResponse } from "../../interface";
import { PlanDocument } from "../../model";

export const addPlanService = async (userId: PlanDocument["id"]): Promise<IPlanResponse> => {

   // Save plan to DB
   const plan = await PlanRepository.create({ ownerId: userId });

   // Update user
   await UserRepository.findByIdAndUpdate(userId, { $push: { plansIds: plan._id } });

   // Return presented data to client
   return planPresenter(plan);

};