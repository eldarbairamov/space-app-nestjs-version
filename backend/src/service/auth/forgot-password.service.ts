import { emailSender } from "../email.service";
import { ActionTokenRepository } from "../../repository";
import jwt from "jsonwebtoken";
import { FORGOT_PASSWORD, RESET_PASSWORD_TOKEN_TYPE } from "../../constant";
import { emailValidator } from "../../validator";
import { ApiException } from "../../exception/api.exception";
import { UserDocument } from "../../model";
import { configuration } from "../../config";

export const forgotPasswordService = async (emailFromReq: string, userFromDb: UserDocument) => {

   // Validation
   const validation = emailValidator.validate({ email: emailFromReq });
   if (validation.error) throw new ApiException(validation.error.message, 400);

   // Generate link
   const resetPasswordToken = jwt.sign({ userId: userFromDb._id }, configuration.SECRET_FORGOT_PASS_KEY, { expiresIn: "1d" });
   const resetPasswordLink = `${ process.env.CLIENT_URL }/password_reset/new?token=${ resetPasswordToken }`;

   // Save action token to DB
   await ActionTokenRepository.create({
      token: resetPasswordToken,
      tokenType: RESET_PASSWORD_TOKEN_TYPE,
      ownerId: userFromDb.id,
   });

   // Send email
   await emailSender(emailFromReq, FORGOT_PASSWORD, { resetPasswordLink, username: userFromDb.username });

};