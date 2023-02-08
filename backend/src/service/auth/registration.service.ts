import { v4 as uuid } from "uuid";
import { emailSender } from "../email.service";
import { UserRepository, ActionTokenRepository } from "../../repository";
import { passHasher } from "../../helper";
import { ACCOUNT_ACTIVATION_SUBJECT, ACTIVATION_TOKEN_TYPE } from "../../constant";
import { IRegistration } from "../../interface";
import { registrationValidator } from "../../validator";
import { ApiException } from "../../exception/api.exception";

export const registrationService = async (body: IRegistration) => {

   // Validation
   const validation = registrationValidator.validate({ ...body });
   if (validation.error) throw new ApiException(validation.error.message, 400);

   // Hash password
   const hashedPassword = await passHasher(body.password!);

   // Save user to DB
   const candidate = await UserRepository.create({ ...body, password: hashedPassword });

   // Generate activation token
   const activationToken = uuid();

   // Save action token to DB
   await ActionTokenRepository.create({
      token: activationToken,
      tokenType: ACTIVATION_TOKEN_TYPE,
      ownerId: candidate.id,
   });

   // Send activation email
   await emailSender(body.email!, ACCOUNT_ACTIVATION_SUBJECT, activationToken);

};