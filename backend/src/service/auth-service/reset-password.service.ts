import { ApiError } from "../../error/Api.error";
import bcrypt from "bcrypt";
import { ActionTokenRepository } from "../../repository";
import { UserRepository } from "../../repository";

export const resetPasswordService = async (token: string, password: string) => {

   // Delete action token
   const actionTokenInfo = await ActionTokenRepository.deleteOne({ token });
   if (!actionTokenInfo) throw new ApiError("Токен невалідний", 401);

   // Define token owner ID
   const ownerId = actionTokenInfo.ownerId;

   // Hash password
   const hashedPassword = await bcrypt
      .hash(password, 8)
      .catch(() => {
         throw new ApiError("Помилка при хешуванні паролю", 500);
      });

   // Update password
   await UserRepository.updateById(ownerId, { password: hashedPassword });

};