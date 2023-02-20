import { MomentRepository, NoteRepository, PlanRepository, UserRepository } from "../../repository";
import { IUserInfoResponse } from "../../interface";
import { UserDocument } from "../../model";

export const getUserInfoService = async (userId: UserDocument["id"]): Promise<IUserInfoResponse> => {

   // Find user in DB and count holding
   const user = await UserRepository.findById(userId) as UserDocument;

   const [ notesCount, plansCount, momentsCount ] = await Promise.all([
      NoteRepository.count(userId),
      PlanRepository.count(userId),
      MomentRepository.count(userId),
   ]);

   // Return presented date to client
   return {
      name: user.name,
      surname: user.surname,
      username: user.username,
      avatar: user.avatar,
      notesCount,
      plansCount,
      momentsCount,
   };

};