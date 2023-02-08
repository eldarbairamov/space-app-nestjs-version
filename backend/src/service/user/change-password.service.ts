import { UserRepository } from "../../repository";
import bcrypt from "bcrypt";
import { ApiException } from "../../exception/api.exception";
import { changePasswordValidator } from "../../validator";
import { IChangePassword } from "../../interface";
import { passHasher } from "../../helper";
import { UserDocument } from "../../model";

export const changePasswordService = async (userId: UserDocument["id"], body: IChangePassword): Promise<void> => {

   // Validator
   const validation = changePasswordValidator.validate(body);
   if (validation.error) throw new ApiException(validation.error.message, 400);

   // Find user in DB
   const user = await UserRepository.findOne({ _id: userId });

   // Compare passwords
   const isPasswordSame = await bcrypt.compare(body.currentPassword, user?.password!);
   if (!isPasswordSame) throw new ApiException("Current password is not valid", 400);

   // Hash password
   user!.password = await passHasher(body.newPassword);

   // Update user
   await user!.save();

};