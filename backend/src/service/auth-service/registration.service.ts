import { v4 as uuid } from "uuid";
import { emailSender } from "../email.service";
import { UserRepository, ActionTokenRepository } from "../../repository";
import { passHasher } from "../../helper";
import { ACCOUNT_ACTIVATION_SUBJECT, ACTIVATION_TOKEN_TYPE } from "../../constant";
import { RegistrationDto } from "../../dto/registration.dto";

export const registrationService = async (registrationDto: RegistrationDto) => {

   // Hash password
   const hashedPassword = await passHasher(registrationDto.password!);

   // Save user to DB
   const candidate = await UserRepository.create({ ...registrationDto, password: hashedPassword });

   // Generate activation token
   const activationToken = uuid();

   // Save action token to DB
   await ActionTokenRepository.create({
      token: activationToken,
      tokenType: ACTIVATION_TOKEN_TYPE,
      ownerId: candidate._id,
   });

   // Send activation email
   await emailSender(registrationDto.email!, ACCOUNT_ACTIVATION_SUBJECT, activationToken);

};