import { ActionTokenRepository, UserRepository } from "../../repository";
import { emailSender } from "../email.service";
import * as jwt from "jsonwebtoken";
import { CHANGE_EMAIL, EMAIL_CONFIRMATION_TOKEN_TYPE } from "../../constant";
import { emailValidator } from "../../validator";
import { ApiException } from "../../exception/api.exception";
import { UserDocument } from "../../model";
import { config } from "../../config";

export const changeEmailReqService = async (userId: UserDocument["id"], email: string): Promise<void> => {

   // Validation
   const validation = emailValidator.validate({ email });
   if (validation.error) throw new ApiException(validation.error.message, 400);

   // Generate link
   const confirmationToken = jwt.sign({ userId, email }, config.SECRET_CHANGE_EMAIL_KEY, { expiresIn: "1d" });
   const confirmationLink = `${ process.env.CLIENT_URL }/email_confirmation/new?token=${ confirmationToken }`;

   // Find user and save action token to DB
   const [ user ] = await Promise.all([
      UserRepository.findById(userId),
      ActionTokenRepository.create({
         token: confirmationToken,
         tokenType: EMAIL_CONFIRMATION_TOKEN_TYPE,
         ownerId: userId,
      }),
   ]);

   // Send email
   await emailSender(email, CHANGE_EMAIL, { confirmationLink, username: user?.username });

};