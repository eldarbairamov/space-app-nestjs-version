import { type IUserDatabase } from "../interface";

export {};

declare global {
   namespace NodeJS {
      interface ProcessEnv {
         PORT: number,
         MONGO_URI: string,
         API_URL: string,
         CLIENT_URL: string,
         EMAIL_SERVICE_USER: string,
         EMAIL_SERVICE_PASS: string
      }
   }
}

declare global {
   namespace Express {
      interface Request {
         user?: IUserDatabase;
         token?: string;
         userId?: string;
      }
   }
}