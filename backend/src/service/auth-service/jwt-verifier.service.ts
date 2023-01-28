import * as jwt from "jsonwebtoken";
import { ApiError } from "../../error/Api.error";
import { config } from "../../config";
import { tokenTypeEnum } from "../../enum/token-type.enum";

export const jwtVerifierService = (token: string, type: string) => {

   // Defined the secret key variable
   let secretKey: string = "";

   // Write the key
   if (type === tokenTypeEnum.ACCESS_TOKEN) secretKey = config.SECRET_ACCESS_TOKEN_KEY as string;
   if (type === tokenTypeEnum.REFRESH_TOKEN) secretKey = config.SECRET_REFRESH_TOKEN_KEY as string;

   // Verify the token
   try {
      const { userId } = jwt.verify(token, secretKey) as { userId: string };
      return userId;

   } catch (e) {
      throw new ApiError("Токен не валідний", 401);
   }
};