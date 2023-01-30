import { PlanRepository } from "../../repository";
import { allPlansPresenter } from "../../presenter/plan.presenter";
import { type IPlanDto } from "../../interface";

export const getPlansBySearchService = async (searchKey: string, userId: string): Promise<IPlanDto[]> => {

   // Search plans by search key
   const plansBySearchKey = await PlanRepository.findAll({
      planOwnerId: userId,
      title: { $regex: searchKey, $options: "i" },
   });

   // Return presented data to client
   return allPlansPresenter(plansBySearchKey);

};