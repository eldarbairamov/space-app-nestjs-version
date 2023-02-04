import { UserRepository } from "../../repository";
import bcrypt from "bcrypt";
import { ApiException } from "../../exception/api.exception";
import { type HydratedDocument } from "mongoose";
import { type IUserSchema } from "../../interface";

export const changePasswordService = async (newPassword: string, currentPassword: string, userId: string): Promise<void> => {

   // Find user in DB
   const user = await UserRepository.findOne({ _id: userId }) as HydratedDocument<IUserSchema> | null;

   // Compare passwords
   const isPasswordSame = await bcrypt.compare(currentPassword, user?.password!);
   if (!isPasswordSame) throw new ApiException("Поточний пароль не валідний.", 400);

   // Hash password
   user!.password = await bcrypt
      .hash(newPassword, 8)
      .catch(() => {
         throw new ApiException("Помилка при хешуванні паролю.", 500);
      });

   // Update user
   await user!.save();

};