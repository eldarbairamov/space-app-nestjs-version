import { type IOAuthDatabase, type IAccessTokenPairDto } from "../interface";

export const AccessTokenPairPresenter = (document: IOAuthDatabase): IAccessTokenPairDto => {

   return {
      tokenOwnerId: document.tokenOwnerId,
      tokenOwnerUsername: document.tokenOwnerUsername,
      tokenId: document._id,
      accessToken: document.accessToken,
      refreshToken: document.refreshToken,
   };
};