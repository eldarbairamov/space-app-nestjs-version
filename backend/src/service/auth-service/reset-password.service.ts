import { ApiException } from "../../exception/api.exception";
import { ActionTokenRepository } from "../../repository";
import { UserRepository } from "../../repository";
import { passHasher } from "../../helper";

export const resetPasswordService = async (token: string, password: string) => {

   // Delete action token
   const actionTokenInfo = await ActionTokenRepository.findOneAndDelete({ token });
   if (!actionTokenInfo) throw new ApiException("Токен невалідний.", 401);

   // Define token owner ID
   const ownerId = actionTokenInfo.ownerId;

   // Hash password
   const hashedPassword = await passHasher(password);

   // Update password
   await UserRepository.findByIdAndUpdate(ownerId, { password: hashedPassword });

};