import expressAsyncHandler from "express-async-handler";
import { ApiException } from "../exception/api.exception";
import { IMAGE_MAX_SIZE, IMAGE_MIMETYPES } from "../constant";
import { IImage } from "../interface";

export const fileMiddleware = {
   imageChecker: expressAsyncHandler(async (req, res, next) => {
      if (!req.files) throw new ApiException("There are no files in request", 400);

      const images = Object.values(req.files);

      for (const image of images) {
         const { size, mimetype } = image as IImage;

         if (size > IMAGE_MAX_SIZE) throw new ApiException("File size must be less than 3 mb", 413);
         if (!IMAGE_MIMETYPES.includes(mimetype)) throw new ApiException("Invalid file type", 400);
      }

      next();

   }),
};