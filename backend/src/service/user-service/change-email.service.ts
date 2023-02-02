import * as jwt from "jsonwebtoken";
import { ApiException } from "../../error/api.exception";
import { ActionTokenRepository } from "../../repository";
import { UserRepository } from "../../repository";

export const changeEmailService = async (confirmationToken: string) => {

   // Decoding token
   const {
      userId,
      email,
   } = jwt.verify(confirmationToken, "secret confirmation token key") as { userId: string, email: string };
   if (!userId) throw new ApiException("Токен невалідний", 401);

   // Delete action token
   const actionToken = await ActionTokenRepository.findOneAndDelete({ token: confirmationToken });
   if (!actionToken) throw new ApiException("Токен невалідний", 401);

   // Update email
   await UserRepository.findByIdAndUpdate(userId, { email: email });

};