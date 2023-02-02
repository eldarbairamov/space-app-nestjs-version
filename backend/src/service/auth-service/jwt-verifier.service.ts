import * as jwt from "jsonwebtoken";
import { ApiException } from "../../error/api.exception";
import { config } from "../../config";
import { ACCESS_TOKEN_TYPE, REFRESH_TOKEN_TYPE } from "../../constant";

export const jwtVerifierService = (token: string, type: string) => {

   // Define the secret key variable
   let secretKey: string = "";

   // Define the secret key value
   if (type === ACCESS_TOKEN_TYPE) secretKey = config.SECRET_ACCESS_TOKEN_KEY as string;
   if (type === REFRESH_TOKEN_TYPE) secretKey = config.SECRET_REFRESH_TOKEN_KEY as string;

   // Verify the token
   try {
      const { userId } = jwt.verify(token, secretKey) as { userId: string };
      return userId;

   } catch (e) {
      throw new ApiException("Токен невалідний", 401);
   }
};