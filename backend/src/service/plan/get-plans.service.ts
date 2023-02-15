import { PlanRepository } from "../../repository";
import { allPlansPresenter } from "../../presenter";
import { IPlanResponse } from "../../interface";
import { UserDocument } from "../../model";

export const getPlansService = async (userId: UserDocument["id"], searchKey: string): Promise<IPlanResponse[]> => {

   // Find all plans in DB
   const plans = await PlanRepository.find({ ownerId: userId }, searchKey);

   // Return presented data to client
   return allPlansPresenter(plans);

};