import { PlanRepository } from "../../repository";
import { allPlansPresenter } from "../../presenter/plan.presenter";
import { PlanDto } from "../../dto/plan.dto";

export const getPlansBySearchService = async (searchKey: string, userId: string): Promise<PlanDto[]> => {

   // Search plans by search key
   const plansBySearchKey = await PlanRepository.find({
      title: { $regex: searchKey, $options: "i" },
      ownerId: userId,
   });

   // Return presented data to client
   return allPlansPresenter(plansBySearchKey);

};