import { MomentDocument } from "../../model";
import { MomentRepository } from "../../repository";
import { fileNameValidator } from "../../validator";
import { ApiException } from "../../exception/api.exception";
import path from "node:path";
import { unlink } from "fs/promises";

export const deletePhotoService = async (body: { fileName: string }, momentId: MomentDocument["id"]): Promise<void> => {

   // Validation
   const validation = fileNameValidator.validate(body);
   if (validation.error) throw new ApiException(validation.error.message, 400);

   // Delete photo from DB
   await MomentRepository.findByIdAndUpdate(momentId, { photo: "" });

   // Delete image from hard drive
   const imagePath = path.join(process.cwd(), "src", "upload", body.fileName);
   await unlink(imagePath);

};