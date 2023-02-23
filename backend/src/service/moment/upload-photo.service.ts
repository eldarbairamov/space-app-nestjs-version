import fileUpload from "express-fileupload";
import { MomentDocument } from "../../model";
import path from "node:path";
import { MomentRepository } from "../../repository";
import { ApiException } from "../../exception/api.exception";
import { exists } from "../../helper/exists";
import { unlinker } from "../../helper/unlinker";
import sharp from "sharp";
import { mkdir } from "fs/promises";

export const uploadPhotoService = async (image: fileUpload.FileArray | null | undefined, momentId: MomentDocument["id"]) => {
   try {
      // Define avatar variable
      const photo = image!.photo as fileUpload.UploadedFile;

      // Generate extension, filename and path for static files
      const ext = path.extname(photo.name);
      const imageName = Date.now() + ext;
      const uploadPath = path.join(process.cwd(), "src", "upload");
      const isFolderExists = await exists(uploadPath);
      if (!isFolderExists) await mkdir(uploadPath);

      // Compress and upload image to "static" folder
      await sharp(photo.data).jpeg({ quality: 70 }).toFile(path.join(uploadPath, imageName));

      // Find moment in DB
      const moment = await MomentRepository.findById(momentId) as MomentDocument;

      // Delete image from hard drive if exists
      const imagePath = path.join(process.cwd(), "src", "upload", (moment.photo ? moment.photo : "nothing"));
      const isImageExists = await exists(imagePath);

      if (isImageExists) await unlinker(imagePath);

      // Save photo do DB
      moment.photo = imageName;
      await moment.save();

      // Return filename to client
      return imageName;

   } catch (e) {
      console.log(e);
      throw new ApiException("Upload image: Error", 500);
   }
};
