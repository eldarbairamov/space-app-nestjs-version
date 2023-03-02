import jwt from "jsonwebtoken";
import { ApiException } from "../../exception/api.exception";
import { configuration } from "../../config";
import { ACCESS_TOKEN_TYPE, REFRESH_TOKEN_TYPE } from "../../constant";
import { Secret } from "jsonwebtoken";

export const jwtVerifyService = (token: string, type: string) => {

   // Define the secret key variable
   let secretKey = "" as Secret;

   // Define the secret key value
   if (type === ACCESS_TOKEN_TYPE) secretKey = configuration.SECRET_ACCESS_TOKEN_KEY;
   if (type === REFRESH_TOKEN_TYPE) secretKey = configuration.SECRET_REFRESH_TOKEN_KEY;

   // Verify and decode the token
   try {
      const { userId } = jwt.verify(token, secretKey) as { userId: string };
      return userId;

   } catch (e) {
      throw new ApiException("Token invalid or expired", 401);
   }
};