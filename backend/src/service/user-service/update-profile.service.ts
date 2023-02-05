import { UpdateProfileDto } from "../../dto";
import { UserRepository } from "../../repository";
import { type IUserDatabase } from "../../interface";
import { ApiException } from "../../exception/api.exception";

export const updateProfileService = async (userId: string, body: UpdateProfileDto): Promise<UpdateProfileDto> => {

   // Check if there is nothing to change
   const userDto = body;
   const userFromDb = await UserRepository.findOne({ _id: userId });

   const objToCompare = {
      username: userFromDb!.username,
      name: userFromDb!.name,
      surname: userFromDb!.surname,
   };

   if (JSON.stringify(userDto) === JSON.stringify(objToCompare)) throw new ApiException("There is nothing to change", 400);

   // Update user
   const updatedUser = await UserRepository.findByIdAndUpdate(userId, body) as IUserDatabase;

   return {
      username: updatedUser.username,
      name: updatedUser.name,
      surname: updatedUser.surname,
   };
};