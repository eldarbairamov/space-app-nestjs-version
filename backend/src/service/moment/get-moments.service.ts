import { UserDocument } from "../../model";
import { MomentRepository } from "../../repository";
import { allMomentsPresenter } from "../../presenter/moment.presenter";
import { IMomentsResponse } from "../../interface";

export const getMomentsService = async (userId: UserDocument["id"], searchKey: string): Promise<IMomentsResponse> => {

   // Find all moments / by search key
   const [ moments, allMoments ] = await Promise.all([
      MomentRepository.find({ ownerId: userId }, searchKey),
      MomentRepository.findAllByUserId(userId),
   ]);

   // Defined unique tags
   const tags = allMoments?.map(moment => moment.tags.map(tag => tag));
   const uniqueTags = Array.from(new Set(tags?.flat()));

   // Return presented data to client
   const presentedMoments = allMomentsPresenter(moments);
   return { data: presentedMoments, tagsForFilter: uniqueTags };

};