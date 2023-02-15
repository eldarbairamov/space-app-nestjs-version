export interface IGetUserInfo {
   readonly name: string;
   readonly surname: string;
   readonly username: string;
   readonly email: string;
   readonly avatar: string;
}

export interface IUpdateProfile {
   readonly username: string;
   readonly name?: string;
   readonly surname?: string;
}

export interface IUser extends IGetUserInfo {
}