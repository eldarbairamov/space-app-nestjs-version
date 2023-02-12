import { UserDocument } from "../../model";
import { MomentRepository } from "../../repository";
import { allMomentsPresenter } from "../../presenter/moment.presenter";
import { IMomentsResponse, IQuery } from "../../interface";

export const getMomentsService = async (userId: UserDocument["id"], query: IQuery): Promise<IMomentsResponse> => {

   // Find all moments in DB and count
   const [ moments, count ] = await Promise.all([
      MomentRepository.findWithQuery({ ownerId: userId }, query),
      MomentRepository.count(userId),
   ]);

   // Defined unique tags
   const allMoments = await MomentRepository.findByUserId(userId);
   const tags = allMoments?.map(moment => {
      if (moment.tags.length) return moment.tags.map(tag => tag);
   });
   const uniqueTags = Array.from(new Set(tags?.flat()));

   // Return presented data to client
   const presentedMoments = allMomentsPresenter(moments);
   return { data: presentedMoments, count, page: +query.page ? +query.page : 1, tagsForFilter: !!query && uniqueTags };

};