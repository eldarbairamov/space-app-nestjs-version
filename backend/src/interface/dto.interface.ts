import { Types } from "mongoose";
import { type IAccessTokenPair } from "./o-auth.interface";

export interface IAccessTokenPairDto extends IAccessTokenPair {
   tokenOwnerId: Types.ObjectId,
   tokenOwnerUsername: string,
   tokenId: Types.ObjectId,
}

export interface INoteDto {
   id: Types.ObjectId
   title: string,
   body: string,
   lastModified: number
}

export interface INotesDto {
   notes: INoteDto[],
   count: number
}