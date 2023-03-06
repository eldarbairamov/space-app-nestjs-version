import { UserDocument } from "../../model";
import { MomentRepository } from "../../repository";
import { allMomentsPresenter } from "../../presenter/moment.presenter";
import { IMomentsResponse } from "../../interface";

export const getMomentsService = async (userId: UserDocument["id"], searchKey: string, limit: string | number): Promise<IMomentsResponse> => {

   // Find all moments / by search key
   const [ moments, count, allMoments ] = await Promise.all([
      MomentRepository.find({ ownerId: userId }, searchKey, limit),
      MomentRepository.count({ ownerId: userId }, searchKey),
      MomentRepository.findAllByUserId(userId),
   ]);

   // Defined unique tags
   const tags = allMoments?.map(moment => moment.tags.map(tag => tag));
   const uniqueTags = Array.from(new Set(tags?.flat()));

   // Return presented data to client
   return {
      data: allMomentsPresenter(moments),
      tagsForFilter: uniqueTags,
      count,
   };

};