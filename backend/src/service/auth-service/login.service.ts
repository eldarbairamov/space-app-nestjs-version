import { accessTokenPairGenerator } from "../token.service";
import { ApiException } from "../../error/api.expception";
import { type IAccessTokenPairDto, type IUserDatabase, type ILoginDto } from "../../interface";
import { OAuthRepository } from "../../repository";
import { passComparer } from "../../helper/pass-comparer";

export const loginService = async (loginDto: ILoginDto, userFromDb: IUserDatabase): Promise<IAccessTokenPairDto> => {

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