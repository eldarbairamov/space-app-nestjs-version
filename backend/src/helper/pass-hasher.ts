import bcrypt from "bcrypt";
import { ApiException } from "../exception/api.exception";

export const passHasher = async (dry: string): Promise<string> => {
   try {
      return await bcrypt.hash(dry, 8);
   } catch (e) {
      throw new ApiException("Помилка при хешуванні паролю", 500);
   }
};