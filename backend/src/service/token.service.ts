import { Types } from "mongoose";
import * as jwt from "jsonwebtoken";
import { ApiError } from "../error/Api.error";
import { type IAccessTokenPair } from "../interface";

export const accessTokenPairGenerator = (userId: Types.ObjectId): IAccessTokenPair => {
   try {
      return {
         accessToken: jwt.sign({ userId }, "secret access token key", { expiresIn: "1d" }),
         refreshToken: jwt.sign({ userId }, "secret refresh token key", { expiresIn: "7d" }),
      };
   } catch (e) {
      throw new ApiError("Помилка при генеруванні токена", 500);
   }
};
