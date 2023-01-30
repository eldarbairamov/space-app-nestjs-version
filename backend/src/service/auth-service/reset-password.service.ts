import { ApiError } from "../../error/Api.error";
import bcrypt from "bcrypt";
import { ActionTokenRepository } from "../../repository/Action-Token.repository";
import { UserRepository } from "../../repository/User.repository";

export const resetPasswordService = async (token: string, password: string) => {

   // Delete action token
   const actionTokenInfo = await ActionTokenRepository.deleteOne({ token });
   if (!actionTokenInfo) throw new ApiError("Токен не валідний", 401);

   // Define token owner ID
   const tokenOwnerId = actionTokenInfo.tokenOwnerId as unknown as string;

   // Hash password
   const hashedPassword = await bcrypt
      .hash(password, 8)
      .catch(e => {
         throw new ApiError("Помилка при хешуванні паролю", 500);
      });

   // Update password
   await UserRepository.updateById(tokenOwnerId, { password: hashedPassword });

};