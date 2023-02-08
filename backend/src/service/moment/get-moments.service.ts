import { UserDocument } from "../../model";
import { MomentRepository } from "../../repository";
import { allMomentsPresenter } from "../../presenter/moment.presenter";

export const getMomentsService = async (userId: UserDocument["id"]) => {

   // Find all moments in DB
   const moments = await MomentRepository.find({ ownerId: userId });

   // Return presented data to client
   return allMomentsPresenter(moments);

};