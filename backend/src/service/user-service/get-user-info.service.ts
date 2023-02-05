import { UserRepository } from "../../repository";
import { type IUserDatabase, type IUserInfoResponse } from "../../interface";
import { HydratedDocument } from "mongoose";

export const getUserInfoService = async (userId: string): Promise<IUserInfoResponse> => {

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