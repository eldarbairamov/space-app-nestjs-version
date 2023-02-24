import { Injectable, PipeTransform } from "@nestjs/common";
import * as path from "path";
import * as sharp from "sharp";
import { exists } from "../helper/exists";
import { mkdir } from "fs/promises";

@Injectable()
export class SharpPipe implements PipeTransform<Express.Multer.File> {

   async transform(image: Express.Multer.File): Promise<string> {
      const ext = path.extname(image.originalname);
      const fileName = Date.now() + ext;
      const uploadPath = path.join(__dirname, "..", "..", "upload");
      const isFolderExists = await exists(uploadPath);

      if (!isFolderExists) await mkdir(uploadPath);

      await sharp(image.buffer).jpeg({ quality: 70 }).toFile(path.join(uploadPath, fileName));

      return fileName;
   }

}