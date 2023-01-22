import { UserRepository } from "../../repository/User.repository";
import bcrypt from "bcrypt";
import { ApiError } from "../../error/Api.error";

export const changePasswordService = async (newPassword: string, currentPassword: string, userId: string) => {

   // Find user in DB
   const user = await UserRepository.findOne({ _id: userId });

   // Compare passwords
   const isPasswordSame = await bcrypt.compare(currentPassword, user?.password!);
   if (!isPasswordSame) throw new ApiError("Поточний пароль не валідний", 400);

   // Hash password
   user!.password = await bcrypt
      .hash(newPassword, 8)
      .catch(e => {
         throw new ApiError("Помилка при хешуванні паролю", 500);
      });

   // Update user
   await user!.save();

};