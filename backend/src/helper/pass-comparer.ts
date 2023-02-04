import bcrypt from "bcrypt";
import { ApiException } from "../exception/api.exception";

export const passComparer = async (dry: string, hashed: string): Promise<boolean> => {
   try {
      return await bcrypt.compare(dry, hashed);
   } catch (e) {
      throw new ApiException("Помилка при порівнянні паролів", 500);
   }
};