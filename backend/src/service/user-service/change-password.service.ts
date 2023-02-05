import { UserRepository } from "../../repository";
import bcrypt from "bcrypt";
import { ApiException } from "../../exception/api.exception";
import { type HydratedDocument } from "mongoose";
import { changePasswordValidator } from "../../validator";
import { type IChangePassword, type IUserSchema } from "../../interface";

export const changePasswordService = async (userId: string, body: IChangePassword): Promise<void> => {

   // Validator
   const validation = changePasswordValidator.validate(body);
   if (validation.error) throw new ApiException(validation.error.message, 400);

   // Find user in DB
   const user = await UserRepository.findOne({ _id: userId }) as HydratedDocument<IUserSchema> | null;

   // Compare passwords
   const isPasswordSame = await bcrypt.compare(body.currentPassword, user?.password!);
   if (!isPasswordSame) throw new ApiException("Поточний пароль невалідний", 400);

   // Hash password
   user!.password = await bcrypt
      .hash(body.newPassword, 8)
      .catch(() => {
         throw new ApiException("Помилка при хешуванні пароля", 500);
      });

   // Update user
   await user!.save();

};