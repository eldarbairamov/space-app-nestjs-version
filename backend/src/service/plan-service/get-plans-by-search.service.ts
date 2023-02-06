import { PlanRepository } from "../../repository";
import { allPlansPresenter } from "../../presenter";
import { IPlanResponse } from "../../interface";
import { UserDocument } from "../../model";

export const getPlansBySearchService = async (searchKey: string, userId: UserDocument["id"]): Promise<IPlanResponse[]> => {

   // Search plans by search key
   const plansBySearchKey = await PlanRepository.find({
      title: { $regex: searchKey, $options: "i" },
      ownerId: userId,
   });

   // Return presented data to client
   return allPlansPresenter(plansBySearchKey);

};