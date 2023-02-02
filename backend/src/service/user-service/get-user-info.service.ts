import { UserRepository } from "../../repository";
import { IUserDatabase } from "../../interface";
import { UserInfoDto } from "../../dto/user-info.dto";

export const getUserInfoService = async (userId: string): Promise<Partial<UserInfoDto>> => {
   const user = await UserRepository.findById(userId) as IUserDatabase;

   return {
      name: user.name,
      surname: user.surname,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
   };
};