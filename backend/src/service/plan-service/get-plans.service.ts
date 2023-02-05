import { PlanRepository } from "../../repository";
import { allPlansPresenter } from "../../presenter";
import { type IPlanResponse } from "../../interface";

export const getPlansService = async (userId: string): Promise<IPlanResponse[]> => {

   // Find all plans in DB
   const plans = await PlanRepository.find({ ownerId: userId });

   // Return presented data to client
   return allPlansPresenter(plans);

};