export interface IEnvironmentVariables {
   clientUrl: string;
   port: number;

   user: string;
   pass: string;

   mongodb_uri: string;

   accessToken: string;
   refreshToken: string;
   forgotPass: string;
   changeEmail: string;
}