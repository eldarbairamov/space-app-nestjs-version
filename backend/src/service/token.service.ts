import * as jwt from "jsonwebtoken";
import { ApiException } from "../error/api.exception";
import { type IAccessTokenPair } from "../interface";
import { config } from "../config";

export const accessTokenPairGenerator = (userId: string): IAccessTokenPair => {
   try {
      return {
         accessToken: jwt.sign({ userId }, config.SECRET_ACCESS_TOKEN_KEY, { expiresIn: "1d" }),
         refreshToken: jwt.sign({ userId }, config.SECRET_REFRESH_TOKEN_KEY, { expiresIn: "7d" }),
      };
   } catch (e) {
      throw new ApiException("Помилка при генеруванні токена", 500);
   }
};
