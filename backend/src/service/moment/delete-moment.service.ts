import { MomentDocument, UserDocument } from "../../model";
import { MomentRepository, UserRepository } from "../../repository";
import path from "node:path";
import { exists } from "../../helper/exists";
import { unlinker } from "../../helper/unlinker";
import { STATIC_PATH } from "../../constant/static-path.constant";

export const deleteMomentService = async (userId: UserDocument["id"], momentId: MomentDocument["id"]) => {
   // Find moment in DB
   const moment = await MomentRepository.findById(momentId) as MomentDocument;

   // Define image path, check if image exists and delete
   const imagePath = path.join(STATIC_PATH, (moment.photo ? moment.photo : "nothing"));
   const isImageExists = await exists(imagePath);
   if (isImageExists) await unlinker(imagePath);

   // Delete moment and update user
   await Promise.all([
      moment.delete(),
      UserRepository.findByIdAndUpdate(userId, { $pull: { momentsIds: momentId } }),
   ]);

};