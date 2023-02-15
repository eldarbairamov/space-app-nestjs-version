import { UserDocument } from "../../model";
import { MomentRepository } from "../../repository";
import { allMomentsPresenter } from "../../presenter/moment.presenter";
import { IMomentsResponse } from "../../interface";

export const getMomentsService = async (userId: UserDocument["id"], searchKey: string): Promise<IMomentsResponse> => {

   // Find all moments in DB
   const moments = await MomentRepository.find({ ownerId: userId }, searchKey);

   // Defined unique tags
   const allMoments = await MomentRepository.findByUserId(userId);
   const tags = allMoments?.map(moment => {
      if (moment.tags.length) return moment.tags.map(tag => tag);
   });
   const uniqueTags = Array.from(new Set(tags?.flat()));

   // Return presented data to client
   const presentedMoments = allMomentsPresenter(moments);
   return { data: presentedMoments, tagsForFilter: uniqueTags };

};