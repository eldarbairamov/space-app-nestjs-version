import bcrypt from "bcrypt";
import { accessTokenPairGenerator } from "../token.service";
import { ApiError } from "../../error/Api.error";
import { AccessTokenPairDto } from "../../dto/access-token-pair.dto";
import { type IAccessTokenPairDto, type IUserDatabase, type ILoginDto } from "../../interface";
import { OAuthRepository } from "../../repository/OAuth.repository";

export const loginService = async (loginDto: ILoginDto, userFromDb: IUserDatabase): Promise<IAccessTokenPairDto> => {

   // Check is user activated
   if (!userFromDb.isActivated) throw new ApiError("Активуйте аккаунт", 403);

   // Compare passwords
   const isPasswordSame = await bcrypt.compare(loginDto.password!, userFromDb.password!);
   if (!isPasswordSame) throw new ApiError("Невірна електронна пошта або пароль", 400);

   // Generate access token pair
   const accessTokenPair = accessTokenPairGenerator(userFromDb._id);

   // Save tokens to DB
   const tokensData = await OAuthRepository.create({
      tokenOwnerId: userFromDb._id,
      tokenOwnerUsername: userFromDb.username,
      ...accessTokenPair,
   });

   // Return presented data for client
   return AccessTokenPairDto(tokensData);

};