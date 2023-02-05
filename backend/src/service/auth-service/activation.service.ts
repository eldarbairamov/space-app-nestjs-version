import { ApiException } from "../../exception/api.exception";
import { ActionTokenRepository } from "../../repository";
import { UserRepository } from "../../repository";

export const activationService = async (activationCode: string) => {

   // Find and delete action token
   const actionTokenInfo = await ActionTokenRepository.findOneAndDelete({ token: activationCode });
   if (!actionTokenInfo) throw new ApiException("Activation code is not valid", 401);

   // Update user status
   await UserRepository.findByIdAndUpdate(actionTokenInfo.ownerId, { isActivated: true });

};