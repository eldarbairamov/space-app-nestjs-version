import { accessTokenPairGenerator } from "../token.service";
import { ApiException } from "../../error/api.exception";
import { type IUserDatabase } from "../../interface";
import { OAuthRepository } from "../../repository";
import { passComparer } from "../../helper";
import { LoginDto, AccessDto } from "../../dto";

export const loginService = async (loginDto: LoginDto, userFromDb: IUserDatabase): Promise<AccessDto> => {

   // Check is user activated
   if (!userFromDb.isActivated) throw new ApiException("Активуйте аккаунт", 403);

   // Compare passwords
   const isPasswordSame = await passComparer(loginDto.password!, userFromDb.password!);
   if (!isPasswordSame) throw new ApiException("Некоректна електронна пошта або пароль", 400);

   // Generate access token pair
   const accessTokenPair = accessTokenPairGenerator(userFromDb._id);

   // Save tokens to DB
   await OAuthRepository.create({
      ...accessTokenPair,
      ownerId: userFromDb._id,
   });

   // Return presented data to client
   return { username: userFromDb.username, ...accessTokenPair };

};