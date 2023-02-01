import { emailSender } from "../email.service";
import { type IUserDatabase } from "../../interface";
import { ActionTokenRepository } from "../../repository";
import * as jwt from "jsonwebtoken";

export const forgotPasswordService = async (emailFromReq: string, userFromDb: IUserDatabase) => {

   // Generate link
   const resetPasswordToken = jwt.sign({ userId: userFromDb._id }, "secret forgot password token key", { expiresIn: "1d" });
   const resetPasswordLink = `${ process.env.CLIENT_URL }/password_reset/new?token=${ resetPasswordToken }`;

   // Save action token to DB
   await ActionTokenRepository.create({
      token: resetPasswordToken,
      tokenType: "Reset Password",
      ownerId: userFromDb._id,
   });

   // Send email
   await emailSender(emailFromReq, "Відновлення паролю", resetPasswordLink);

};