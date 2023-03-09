import { IAccessTokenPair } from "./access-token-pair.interface";

export interface ILoginResponse extends IAccessTokenPair {
   readonly username: string,
}

