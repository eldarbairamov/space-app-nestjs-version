import * as jwt from "jsonwebtoken";
import { ApiException } from "../../exception/api.exception";
import { config } from "../../config";
import { ACCESS_TOKEN_TYPE, REFRESH_TOKEN_TYPE } from "../../constant";
import { Secret } from "jsonwebtoken";

export const jwtVerifyService = (token: string, type: string) => {

   // Define the secret key variable
   let secretKey = "" as Secret;

   // Define the secret key value
   if (type === ACCESS_TOKEN_TYPE) secretKey = config.SECRET_ACCESS_TOKEN_KEY;
   if (type === REFRESH_TOKEN_TYPE) secretKey = config.SECRET_REFRESH_TOKEN_KEY;

   // Verify and decode the token
   try {
      const { userId } = jwt.verify(token, secretKey) as { userId: string };
      return userId;

   } catch (e) {
      throw new ApiException("Invalid token", 401);
   }
};