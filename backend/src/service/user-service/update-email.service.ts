import { ActionTokenRepository } from "../../repository";
import { emailSender } from "../email.service";
import * as jwt from "jsonwebtoken";

export const updateEmailService = async (userId: string, email: string): Promise<void> => {

   // Generate link
   const confirmationToken = jwt.sign({ userId, email }, "secret confirmation token key", { expiresIn: "1d" });
   const confirmationLink = `${ process.env.CLIENT_URL }/email_confirmation/new?token=${ confirmationToken }`;

   // Save action token to DB
   await ActionTokenRepository.create({
      token: confirmationToken,
      tokenType: "Email Confirmation",
      ownerId: userId,
   });

   // Send email
   await emailSender(email, "Підтвердження електронної пошти", confirmationLink);

};