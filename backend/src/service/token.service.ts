import * as jwt from "jsonwebtoken";
import { ApiException } from "../exception/api.exception";
import { IAccessTokenPair } from "../interface";
import { config } from "../config";
import { UserDocument } from "../model";

export const accessTokenPairGenerator = (userId: UserDocument["id"]): IAccessTokenPair => {
   try {
      return {
         accessToken: jwt.sign({ userId }, config.SECRET_ACCESS_TOKEN_KEY, { expiresIn: "1d" }),
         refreshToken: jwt.sign({ userId }, config.SECRET_REFRESH_TOKEN_KEY, { expiresIn: "7d" }),
      };
   } catch (e) {
      console.log(e);
      throw new ApiException("JWT: Error", 500);
   }
};
