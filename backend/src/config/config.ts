import { Secret } from "jsonwebtoken";

export const config = {
   PORT: process.env.PORT,
   MONGO_URI: process.env.MONGO_URI,

   API_URL: process.env.API_URL,
   CLIENT_URL: process.env.CLIENT_URL,

   EMAIL_SERVICE_USER: process.env.EMAIL_SERVICE_USER,
   EMAIL_SERVICE_PASS: process.env.EMAIL_SERVICE_PASS,

   SECRET_ACCESS_TOKEN_KEY: process.env.SECRET_ACCESS_TOKEN_KEY as Secret,
   SECRET_REFRESH_TOKEN_KEY: process.env.SECRET_REFRESH_TOKEN_KEY as Secret,
   SECRET_FORGOT_PASS_KEY: process.env.SECRET_FORGOT_PASS_KEY as Secret,
   SECRET_CHANGE_EMAIL_KEY: process.env.SECRET_CHANGE_EMAIL_KEY as Secret,

};
