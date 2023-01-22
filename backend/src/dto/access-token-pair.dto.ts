import { type IOAuthDatabase, type IAccessTokenPairDto } from "../interface";

export const AccessTokenPairDto = (document: IOAuthDatabase): IAccessTokenPairDto => {

   return {
      tokenOwnerId: document.tokenOwnerId,
      tokenOwnerUsername: document.tokenOwnerUsername,
      tokenId: document._id,
      accessToken: document.accessToken,
      refreshToken: document.refreshToken,
   };
};