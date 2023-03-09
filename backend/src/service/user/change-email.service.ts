import jwt from "jsonwebtoken";
import { ApiException } from "../../exception/api.exception";
import { ActionTokenRepository, UserRepository } from "../../repository";
import { changeEmailValidator } from "../../validator";
import { configuration } from "../../config";

export const changeEmailService = async (confirmationToken: string): Promise<void> => {

   // Validation
   const validation = changeEmailValidator.validate({ confirmationToken });
   if (validation.error) throw new ApiException(validation.error.message, 400);

   // Decoding token
   const {
      userId,
      email,
   } = jwt.verify(confirmationToken, configuration.SECRET_CHANGE_EMAIL_KEY) as { userId: string, email: string };

   if (!userId && !email) throw new ApiException("Token invalid or expired", 401);

   // Delete action token
   const actionToken = await ActionTokenRepository.findOneAndDelete({ token: confirmationToken });
   if (!actionToken) throw new ApiException("Token invalid or expired", 401);

   // Update email
   await UserRepository.findByIdAndUpdate(userId, { email: email });

};