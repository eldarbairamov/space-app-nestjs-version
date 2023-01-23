import { Types } from "mongoose";
import { type IAccessTokenPair } from "./o-auth.interface";

export interface IAccessTokenPairDto extends IAccessTokenPair {
   tokenOwnerId: Types.ObjectId,
   tokenOwnerUsername: string,
   tokenId: Types.ObjectId,
}

export interface INoteDto {
   title: string,
   body: string,
   lastModified: Date
}