import bcrypt from "bcrypt";
import { ApiException } from "../exception/api.exception";

export const passHasher = async (dry: string): Promise<string> => {
   try {
      return await bcrypt.hash(dry, 8);
   } catch (e) {
      console.log(e);
      throw new ApiException("Bcrypt: Hash error", 500);
   }
};