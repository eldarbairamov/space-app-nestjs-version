import * as jwt from "jsonwebtoken";
import { ApiError } from "../../error/Api.error";
import { ActionTokenRepository } from "../../repository";
import { UserRepository } from "../../repository";

export const changeEmailService = async (confirmationToken: string) => {

   // Decoding token
   const {
      userId,
      email,
   } = jwt.verify(confirmationToken, "secret confirmation token key") as { userId: string, email: string };
   if (!userId) throw new ApiError("Токен не валідний", 401);

   // Delete action token
   const actionToken = await ActionTokenRepository.findOneAndDelete({ token: confirmationToken });
   if (!actionToken) throw new ApiError("Токен не валідний", 401);

   // Update email
   await UserRepository.findByIdAndUpdate(userId, { email: email });

};