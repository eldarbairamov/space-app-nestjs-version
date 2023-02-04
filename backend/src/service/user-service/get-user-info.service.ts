import { UserRepository } from "../../repository";
import { type IUserDatabase } from "../../interface";
import { UserInfoDto } from "../../dto";
import { HydratedDocument } from "mongoose";

export const getUserInfoService = async (userId: string): Promise<Partial<UserInfoDto>> => {

   // Find user in DB
   const user = await UserRepository.findById(userId) as HydratedDocument<IUserDatabase>;

   // Return info dto
   return {
      userId: user._id,
      name: user.name,
      surname: user.surname,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
   };

};