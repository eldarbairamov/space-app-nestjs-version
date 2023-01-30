import { UserRepository } from "../../repository";
import { type IUserInfoDto } from "../../interface";

export const getUserInfoService = async (userId: string): Promise<Partial<IUserInfoDto>> => {
   const user = await UserRepository.findOne({ _id: userId });

   return {
      name: user?.name,
      surname: user?.surname,
      username: user?.username,
      email: user?.email,
      avatar: user?.avatar,
   };
};