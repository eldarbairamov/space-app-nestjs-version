export class LoginDto {
   readonly email: string
   readonly password: string
}

export class RegistrationDto {
   readonly username: string;
   readonly email: string;
   readonly password: string;
}

export class OAuthDto {
   readonly username: string;
   readonly accessToken: string;
   readonly refreshToken: string;
}