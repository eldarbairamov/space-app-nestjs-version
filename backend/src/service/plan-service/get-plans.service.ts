import { PlanRepository } from "../../repository";
import { allPlansPresenter } from "../../presenter";
import { PlanResponseDto } from "../../dto";

export const getPlansService = async (userId: string): Promise<PlanResponseDto[]> => {

   // Find all plans in DB
   const plans = await PlanRepository.find({ ownerId: userId });

   // Return presented data to client
   return allPlansPresenter(plans);

};