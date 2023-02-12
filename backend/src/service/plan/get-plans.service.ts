import { PlanRepository } from "../../repository";
import { allPlansPresenter } from "../../presenter";
import { IPlansResponse, IQuery } from "../../interface";
import { UserDocument } from "../../model";

export const getPlansService = async (userId: UserDocument["id"], query: IQuery): Promise<IPlansResponse> => {

   // Find all plans in DB and count
   const [ plans, count ] = await Promise.all([
      PlanRepository.find({ ownerId: userId }, query),
      PlanRepository.count(userId),
   ]);

   // Return presented data to client
   const presentedPlans = allPlansPresenter(plans);
   return { data: presentedPlans, count, page: +query.page ? +query.page : 1 };

};