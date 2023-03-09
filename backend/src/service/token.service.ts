import jwt from "jsonwebtoken";
import { ApiException } from "../exception/api.exception";
import { IAccessTokenPair } from "../interface";
import { configuration } from "../config";
import { UserDocument } from "../model";

export const accessTokenPairGenerator = (userId: UserDocument["id"]): IAccessTokenPair => {
   try {
      return {
         accessToken: jwt.sign({ userId }, configuration.SECRET_ACCESS_TOKEN_KEY, { expiresIn: "1d" }),
         refreshToken: jwt.sign({ userId }, configuration.SECRET_REFRESH_TOKEN_KEY, { expiresIn: "7d" }),
      };
   } catch (e) {
      const error = e as Error;
      console.log(error.message);
      throw new ApiException("JWT: Error", 500);
   }
};
