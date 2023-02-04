import { UserInfoDto } from "../../dto";
import { UserRepository } from "../../repository";
import { IUserDatabase } from "../../interface";

export const updateUserService = async (userId: string, body: UserInfoDto): Promise<Partial<UserInfoDto>> => {

   // Update user
   const updatedUser = await UserRepository.findByIdAndUpdate(userId, body) as IUserDatabase

   return {
      username: updatedUser.username,
      name: updatedUser.name,
      surname: updatedUser.surname,
      avatar: updatedUser.avatar,
   };
};