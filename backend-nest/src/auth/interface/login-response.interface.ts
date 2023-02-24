import { IAccessTokenPair } from "./refresh-response.interface";

export interface ILoginResponse extends IAccessTokenPair{
   readonly username: string,
}

