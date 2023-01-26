import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { emailSender } from "../email.service";
import { UserRepository, ActionTokenRepository } from "../../repository";
import { ApiError } from "../../error/Api.error";
import { type IRegistrationDto } from "../../interface";

export const registrationService = async (registrationDto: IRegistrationDto) => {

   // Hash password
   const hashedPassword = await bcrypt
      .hash(registrationDto.password!, 8)
      .catch(e => {
         throw new ApiError("Помилка при хешуванні паролю", 500);
      });

   // Generate activation token
   const activationToken = uuid();

   // Save user to DB
   const candidate = await UserRepository.create({ ...registrationDto, password: hashedPassword });

   // Save action token to DB
   await ActionTokenRepository.create({
      tokenOwnerId: candidate._id,
      tokenType: "Activation Token",
      token: activationToken,
   });

   // Send activation email
   await emailSender(registrationDto.email!, "Активація аккаунта", activationToken);

};