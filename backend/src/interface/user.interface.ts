export interface IChangePassword {
   readonly newPassword: string;
   readonly currentPassword: string;
}

export interface IUserInfoResponse {
   readonly name: string;
   readonly surname: string;
   readonly username: string;
   readonly avatar: string;
}

export interface IUpdateProfile {
   readonly name: string;
   readonly surname: string;
   readonly username: string;
}

export interface IDeleteAvatar {
   readonly fileName: string;
}

export interface IChangeEmail {
   readonly confirmationToken: string;
}