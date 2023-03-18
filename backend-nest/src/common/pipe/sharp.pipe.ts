import {  Injectable, PipeTransform } from "@nestjs/common";
import path from "path";
import sharp from "sharp";
import { mkdir } from "fs/promises";
import process from "process";
import { exists } from "@src/common/helper";

@Injectable()
export class SharpPipe implements PipeTransform<Express.Multer.File> {

   async transform(image: Express.Multer.File): Promise<string> {
      const ext = path.extname(image.originalname);
      const fileName = Date.now() + ext;
      const uploadPath = path.join(process.cwd(), "client");
      const isFolderExists = await exists(uploadPath);

      if (!isFolderExists) await mkdir(uploadPath);

      await sharp(image.buffer).jpeg({ quality: 50 }).toFile(path.join(uploadPath, fileName));

      return fileName;
   }

}