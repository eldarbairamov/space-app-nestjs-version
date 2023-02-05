import { ApiException } from "../../exception/api.exception";
import { ActionTokenRepository, UserRepository } from "../../repository";
import { passHasher } from "../../helper";
import { resetPasswordValidator } from "../../validator";
import { type IResetPassword } from "../../interface";

export const resetPasswordService = async (body: IResetPassword) => {

   // Validation
   const validation = resetPasswordValidator.validate(body);
   if (validation.error) throw new ApiException(validation.error.message, 400);

   // Delete action token
   const actionTokenInfo = await ActionTokenRepository.findOneAndDelete({ token: body.resetPasswordToken });
   if (!actionTokenInfo) throw new ApiException("Токен невалідний", 401);

   // Define token owner ID
   const ownerId = actionTokenInfo.ownerId;

   // Hash password
   const hashedPassword = await passHasher(body.password);

   // Update password
   await UserRepository.findByIdAndUpdate(ownerId, { password: hashedPassword });

};