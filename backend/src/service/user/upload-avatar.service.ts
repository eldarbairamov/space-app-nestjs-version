import fileUpload from "express-fileupload";
import path from "node:path";
import { UserRepository } from "../../repository";
import { ApiException } from "../../exception/api.exception";
import { UserDocument } from "../../model";
import sharp from "sharp";
import { exists } from "../../helper/exists";
import { mkdir } from "fs/promises";

export const uploadAvatarService = async (image: fileUpload.FileArray | null | undefined, userId: UserDocument["id"]): Promise<string> => {
   try {
      // Define avatar variable
      const avatar = image!.avatar as fileUpload.UploadedFile;

      // Generate extension, filename and path for static files
      const ext = path.extname(avatar.name);
      const imageName = Date.now() + ext;
      const uploadPath = path.join(process.cwd(), "src", "upload");
      const isFolderExists = await exists(uploadPath);
      if (!isFolderExists) await mkdir(uploadPath);

      // Compress and upload image to "static" folder
      await sharp(avatar.data).jpeg({ quality: 70 }).toFile(path.join(uploadPath, imageName));

      // Save avatar to DB
      await UserRepository.findByIdAndUpdate(userId, { avatar: imageName });

      // Return filename to client
      return imageName;

   } catch (e) {
      console.log(e);
      throw new ApiException("Upload image: Error", 500);
   }
};