import fileUpload from "express-fileupload";
import { MomentDocument } from "../../model";
import path from "node:path";
import { MomentRepository } from "../../repository";
import { ApiException } from "../../exception/api.exception";
import { unlink } from "fs/promises";
import fs from "fs";

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

      // Find moment in DB
      const moment = await MomentRepository.findById(momentId) as MomentDocument;

      // Delete image from hard drive if exists
      const imagePath = path.join(process.cwd(), "src", "upload", moment.photo);
      fs.access(imagePath, async (err) => {
         if (!err) {
            await unlink(imagePath).catch(() => {
               throw new ApiException("No such image or directory", 500);
            });
         }
      });

      // Save photo do DB
      moment.photo = fileName;
      await moment.save();

      // Return filename to client
      return fileName;

   } catch (e) {
      console.log(e);
      throw new ApiException("Upload image: Error", 500);
   }
};
