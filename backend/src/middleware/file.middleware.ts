import expressAsyncHandler from "express-async-handler";
import { ApiException } from "../exception/api.exception";
import { IMAGE_MAX_SIZE, IMAGE_MIMETYPES } from "../constant/upload-image.constant";
import { IImage } from "../interface/file.interface";

export const fileMiddleware = {
   imageChecker: expressAsyncHandler(async (req, res, next) => {
      if (!req.files) throw new ApiException("Запит пустий", 400);

      const images = Object.values(req.files);

      for (const image of images) {
         const { size, mimetype } = image as IImage;

         if (size > IMAGE_MAX_SIZE) throw new ApiException("Розмір файлу не має перевищувати 3 МБ", 400);
         if (!IMAGE_MIMETYPES.includes(mimetype)) throw new ApiException("Недопустимий формат файлу", 400);
      }

      next();

   }),
};