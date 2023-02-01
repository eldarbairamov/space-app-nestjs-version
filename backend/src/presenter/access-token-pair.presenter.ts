import { type IOAuthDatabase, type IAccessTokenPairDto } from "../interface";

export const AccessTokenPairPresenter = (document: IOAuthDatabase, username: string): IAccessTokenPairDto => {

   return {
      ownerUsername: username,
      accessToken: document.accessToken,
      refreshToken: document.refreshToken,
   };
};