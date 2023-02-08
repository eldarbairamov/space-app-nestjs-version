import fileUpload from "express-fileupload";
import { MomentDocument } from "../../model";
import path from "node:path";
import { MomentRepository } from "../../repository";
import { ApiException } from "../../exception/api.exception";

export const uploadPhotoService = async (image: fileUpload.FileArray | null | undefined, momentId: MomentDocument["id"]) => {
   try {
      // Define avatar variable
      const photo = image!.photo as fileUpload.UploadedFile;

      // Generate extension, filename and path for static files
      const ext = path.extname(photo.name);
      const fileName = Date.now() + ext;
      const uploadPath = path.join(process.cwd(), "src", "upload", fileName);

      // Upload image to "static" folder
      await photo.mv(uploadPath);

      // Save avatar to DB
      await MomentRepository.findByIdAndUpdate(momentId, { photo: fileName });

      // Return filename to client
      return fileName;

   } catch (e) {
      console.log(e);
      throw new ApiException("Upload image: Error", 500);
   }
};