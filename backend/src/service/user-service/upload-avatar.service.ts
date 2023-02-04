import fileUpload from "express-fileupload";
import path from "node:path";
import { UserRepository } from "../../repository";
import { ApiException } from "../../exception/api.exception";

export const uploadAvatarService = async (files: fileUpload.FileArray | null | undefined, userId: string): Promise<string> => {
   try {
      // Define avatar variable
      const avatar = files!.avatar as fileUpload.UploadedFile;

      // Generate extension, filename and path for static files
      const ext = path.extname(avatar.name);
      const fileName = Date.now() + ext;
      const uploadPath = path.join(process.cwd(), "src", "upload", fileName);

      // Upload image to "static" folder
      await avatar.mv(uploadPath);

      // Save avatar to DB
      await UserRepository.findByIdAndUpdate(userId, { avatar: fileName });

      // Return filename to client
      return fileName;

   } catch (e) {
      throw new ApiException("Помилка при завантаженні файла", 500);
   }
};