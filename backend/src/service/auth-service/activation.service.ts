import { ApiError } from "../../error/Api.error";
import { ActionTokenRepository } from "../../repository";
import { UserRepository } from "../../repository";

export const activationService = async (activationCode: string) => {

   // Find and delete action token
   const actionTokenInfo = await ActionTokenRepository.deleteOne({ token: activationCode });
   if (!actionTokenInfo) throw new ApiError("Не валідний код активації", 401);

   // Update user status
   await UserRepository.updateById(actionTokenInfo.tokenOwnerId, { isActivated: true });

};