import { ApiException } from "../../error/api.expception";
import { ActionTokenRepository } from "../../repository";
import { UserRepository } from "../../repository";

export const activationService = async (activationCode: string) => {

   // Find and delete action token
   const actionTokenInfo = await ActionTokenRepository.findOneAndDelete({ token: activationCode });
   if (!actionTokenInfo) throw new ApiException("Невалідний код активації", 401);

   // Update user status
   await UserRepository.findByIdAndUpdate(actionTokenInfo.ownerId, { isActivated: true });

};