import { UserRepository } from "../../repository";
import { type IUserDatabase } from "../../interface";
import { UserInfoResponseDto } from "../../dto";
import { HydratedDocument } from "mongoose";

export const getUserInfoService = async (userId: string): Promise<UserInfoResponseDto> => {

   // Find user in DB
   const user = await UserRepository.findById(userId) as HydratedDocument<IUserDatabase>;

   // Return info dto
   return {
      name: user.name,
      surname: user.surname,
      username: user.username,
      avatar: user.avatar,
   };

};