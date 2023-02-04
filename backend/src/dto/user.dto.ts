export class ChangePasswordDto {
   readonly newPassword: string;
   readonly currentPassword: string;
}

export class UserInfoResponseDto {
   readonly userId: string;
   readonly name: string;
   readonly surname: string;
   readonly username: string;
   readonly email: string;
   readonly avatar: string;
}