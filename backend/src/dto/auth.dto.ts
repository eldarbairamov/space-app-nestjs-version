export class RegistrationDto {
   readonly username: string;
   readonly email: string;
   readonly password: string;
}

export class OAuthResponseDto {
   readonly username: string;
   readonly accessToken: string;
   readonly refreshToken: string;
}

export class LoginDto {
   readonly email: string;
   readonly password: string;
}