import { UserDocument } from "../../model";
import { MomentRepository, UserRepository } from "../../repository";
import { momentPresenter } from "../../presenter/moment.presenter";

export const addMomentService = async (userId: UserDocument["id"]) => {

   // Save moment to DB
   const moment = await MomentRepository.create({ ownerId: userId });

   // Update user
   await UserRepository.findByIdAndUpdate(userId, { $push: { momentsIds: moment.id } });

   // Return presented data to client
   return momentPresenter(moment);

};