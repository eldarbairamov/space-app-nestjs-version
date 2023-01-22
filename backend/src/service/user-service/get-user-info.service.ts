import { UserRepository } from "../../repository/User.repository";

export const getUserInfoService = async (userId: string) => {
   const user = await UserRepository.findOne({ _id: userId });

   return {
      name: user?.name,
      surname: user?.surname,
      username: user?.username,
      email: user?.email,
      avatar: user?.avatar,
   };
};