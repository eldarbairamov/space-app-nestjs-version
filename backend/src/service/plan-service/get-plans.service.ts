import { PlanRepository } from "../../repository";
import { allPlansPresenter } from "../../presenter";
import { PlanDto } from "../../dto";

export const getPlansService = async (userId: string): Promise<PlanDto[]> => {

   // Find all plans in DB
   const plans = await PlanRepository.find({ ownerId: userId });

   // Return presented data to client
   return allPlansPresenter(plans);

};