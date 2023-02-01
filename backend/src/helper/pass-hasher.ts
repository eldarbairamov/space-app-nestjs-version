import bcrypt from "bcrypt";
import { ApiException } from "../error/api.expception";

export const passHasher = async (dry: string) => {
   try {
      return await bcrypt.hash(dry, 8);
   } catch (e) {
      throw new ApiException("Помилка при хешуванні паролю", 500);
   }
};