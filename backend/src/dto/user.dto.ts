export class ChangePasswordDto {
   readonly newPassword: string;
   readonly currentPassword: string;
}

export class UserInfoResponseDto {
   readonly name: string;
   readonly surname: string;
   readonly username: string;
   readonly avatar: string;
}

export class UpdateProfileDto {
   readonly name: string;
   readonly surname: string;
   readonly username: string;
}