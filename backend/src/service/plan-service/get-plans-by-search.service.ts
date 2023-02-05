import { PlanRepository } from "../../repository";
import { allPlansPresenter } from "../../presenter";
import { type IPlanResponse } from "../../interface";

export const getPlansBySearchService = async (searchKey: string, userId: string): Promise<IPlanResponse[]> => {

   // Search plans by search key
   const plansBySearchKey = await PlanRepository.find({
      title: { $regex: searchKey, $options: "i" },
      ownerId: userId,
   });

   // Return presented data to client
   return allPlansPresenter(plansBySearchKey);

};