import { MomentDocument } from "../../model";
import { IMomentResponse } from "../../interface";
import { MomentRepository } from "../../repository";
import { momentPresenter } from "../../presenter/moment.presenter";

export const getOneMomentService = async (momentId: MomentDocument["id"]): Promise<IMomentResponse> => {

   // Find moment in DB
   const moment = await MomentRepository.findById(momentId) as MomentDocument;

   // Return presented data to client
   return momentPresenter(moment);

};