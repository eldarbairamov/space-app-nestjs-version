import { memoryStorage } from "multer";
import { MulterModuleOptions } from "@nestjs/platform-express";
import { IMAGE_MAX_SIZE, IMAGE_MIMETYPES } from "../constants";
import { HttpException } from "@nestjs/common";

export const fileStorage: MulterModuleOptions = {
   limits: { fileSize: IMAGE_MAX_SIZE },
   fileFilter: (req, file, cb) => {
      const targetType = file.mimetype;
      IMAGE_MIMETYPES.includes(targetType) ? cb(null, true) : cb(new HttpException("Invalid file type", 422), false);
   },
   storage: memoryStorage(),
};