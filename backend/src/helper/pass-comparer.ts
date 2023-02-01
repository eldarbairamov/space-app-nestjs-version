import bcrypt from "bcrypt";
import { ApiException } from "../error/api.expception";

export const passComparer = async (dry: string, hashed: string) => {
   try {
      return await bcrypt.compare(dry, hashed);
   } catch (e) {
      throw new ApiException("Помилка при порівнянні паролів", 500);
   }
};