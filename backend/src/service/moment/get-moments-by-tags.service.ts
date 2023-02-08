import { UserDocument } from "../../model";
import { MomentRepository } from "../../repository";
import { allMomentsPresenter } from "../../presenter/moment.presenter";
import { IMomentResponse } from "../../interface";

export const getMomentsByTagsService = async (userId: UserDocument["id"], tags: string): Promise<IMomentResponse[]> => {

   // Convert query to array
   const queryToArray = tags.split(",");

   // Search notes by search key
   const momentsByTags = await MomentRepository.find({ ownerId: userId, tags: { $in: queryToArray } });

   // Return presented data to client
   return allMomentsPresenter(momentsByTags);

};