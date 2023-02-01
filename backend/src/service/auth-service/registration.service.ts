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
      .catch(() => {
         throw new ApiError("Помилка при хешуванні паролю", 500);
      });

   // Save user to DB
   const candidate = await UserRepository.create({ ...registrationDto, password: hashedPassword });

   // Generate activation token
   const activationToken = uuid();

   // Save action token to DB
   await ActionTokenRepository.create({
      token: activationToken,
      tokenType: "Activation Token",
      ownerId: candidate._id,
   });

   // Send activation email
   await emailSender(registrationDto.email!, "Активація аккаунта", activationToken);

};