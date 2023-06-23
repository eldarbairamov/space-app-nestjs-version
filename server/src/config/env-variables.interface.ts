export interface IEnvironmentVariables {
   CLIENT_URL: string;
   PORT: number;

   EMAIL_SERVICE_USER: string;
   EMAIL_SERVICE_PASS: string;

   MONGO_URI: string;

   SECRET_ACCESS_TOKEN_KEY: string;
   SECRET_REFRESH_TOKEN_KEY: string;
   SECRET_FORGOT_PASS_KEY: string;
   SECRET_CHANGE_EMAIL_KEY: string;
}