export class GetUserInfoDto {
   readonly name: string;
   readonly surname: string;
   readonly username: string;
   readonly email: string;
   readonly avatar: string;
}

export class UpdateProfileDto {
   readonly username: string;
   readonly name?: string;
   readonly surname?: string;
}