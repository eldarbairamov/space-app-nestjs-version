import { ApiError } from "../../error/Api.error";
import { ActionTokenRepository } from "../../repository/Action-Token.repository";
import { UserRepository } from "../../repository/User.repository";

export const activationService = async (activationCode: string) => {

   // Find and delete action token
   const actionTokenInfo = await ActionTokenRepository.findOneAndDelete({ token: activationCode });
   if (!actionTokenInfo) throw new ApiError("Не валідний код активації", 401);

   // Update user status
   await UserRepository.findOneAndUpdate({ _id: actionTokenInfo!.tokenOwnerId }, { isActivated: true });

};