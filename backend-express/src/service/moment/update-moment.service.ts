import { MomentDocument } from "../../model";
import { IUpdateMoment } from "../../interface";
import { updateMomentValidator } from "../../validator";
import { ApiException } from "../../exception/api.exception";
import { MomentRepository } from "../../repository";

export const updateMomentService = async (momentId: MomentDocument["id"], body: IUpdateMoment) => {

   // Validation
   const validation = updateMomentValidator.validate(body);
   if (validation.error) throw new ApiException(validation.error.message, 400);

   // Update moment
   await MomentRepository.findByIdAndUpdate(momentId, body);

};