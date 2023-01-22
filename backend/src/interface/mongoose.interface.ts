import { Types } from "mongoose";

export interface IOAuthSchema {
   tokenOwnerId: Types.ObjectId,
   tokenOwnerUsername: string,
   accessToken: string,
   refreshToken: string,
}

export interface IOAuthDatabase extends IOAuthSchema {
   _id: Types.ObjectId,
   createdAt: string,
   updatedAt: string,
}

export interface IAccessTokenPair {
   accessToken: string,
   refreshToken: string
}

export interface IAccessTokenPairDto extends IAccessTokenPair {
   tokenOwnerId: Types.ObjectId,
   tokenOwnerUsername: string,
   tokenId: Types.ObjectId,
}

export interface IUserSchema {
   name: string,
   surname: string,
   username: string,
   email: string,
   password: string,
   isActivated: boolean,
   avatar: string
}

export interface IUserDatabase extends IUserSchema {
   _id: Types.ObjectId,
   createdAt: string,
   updatedAt: string,
}

export interface IActionTokenSchema {
   tokenOwnerId: Types.ObjectId,
   tokenType: string,
   token: string
}

export interface IActionTokenDatabase extends IActionTokenSchema {
   _id: Types.ObjectId,
   createdAt: string,
   updatedAt: string,
}
