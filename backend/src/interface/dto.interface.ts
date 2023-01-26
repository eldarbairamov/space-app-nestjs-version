import { type ObjectId } from "mongoose";
import { type IAccessTokenPair } from "./o-auth.interface";

export interface IAccessTokenPairDto extends IAccessTokenPair {
   tokenOwnerId: string,
   tokenOwnerUsername: string,
   tokenId: string,
}

export interface INoteDto {
   id: string
   title: string,
   body: string,
   lastModified: number
}

export interface IPlanDto {
   id: string,
   title: string,
   lastModified: number
}

export interface ITaskDto {
   id: string,
   title: string,
   isCompleted: boolean
}

export interface IRegistrationDto {
   username: string,
   email: string,
   password: string
}

export interface ILoginDto {
   email: string,
   password: string
}