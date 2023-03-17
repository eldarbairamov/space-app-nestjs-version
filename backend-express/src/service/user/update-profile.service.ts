import { UserRepository } from "../../repository";
import { ApiException } from "../../exception/api.exception";
import { updateProfileValidator } from "../../validator";
import { IUpdateProfile } from "../../interface";
import { UserDocument } from "../../model";

export const updateProfileService = async (userId: UserDocument["id"], body: IUpdateProfile): Promise<IUpdateProfile> => {

   // Validation
   const validation = updateProfileValidator.validate(body);
   if (validation.error) throw new ApiException(validation.error.message, 400);

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
   const updatedUser = await UserRepository.findByIdAndUpdate(userId, body) as UserDocument;

   return {
      username: updatedUser.username,
      name: updatedUser.name,
      surname: updatedUser.surname,
   };
};