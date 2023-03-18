import { PlanRepository } from "@src/repository";
import { allPlansPresenter } from "@src/presenter";
import { UserDocument } from "@src/model";
import { IPlansResponse } from "@src/interface";

export const getPlansService = async (userId: UserDocument["id"], searchKey: string, limit: string | number): Promise<IPlansResponse> => {

   // Find all plans in DB
   const [ plans, count ] = await Promise.all([
      PlanRepository.find({ ownerId: userId }, searchKey, limit),
      PlanRepository.count({ ownerId: userId }, searchKey),
   ]);

   // Return presented data to client
   return {
      data: allPlansPresenter(plans),
      count,
   };

};