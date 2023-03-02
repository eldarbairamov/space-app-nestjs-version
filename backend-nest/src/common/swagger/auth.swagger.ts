import { ApiProperty } from "@nestjs/swagger";

export class EmailInUse {
   @ApiProperty({ example: 409 })
   readonly statusCode: number;

   @ApiProperty({ example: "This email is already is use" })
   readonly message: string;
}

export class LoginBody {
   @ApiProperty({ example: "john_doe@gmail.com", required: true })
   readonly email: string;

   @ApiProperty({ example: "123456", required: true })
   readonly password: string;
}

export class LoginResponse {
   @ApiProperty({ example: "john_doe" })
   readonly username: string;

   @ApiProperty({ example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2ZlMDhhMDA0MDNhMGY4YzZkZTVjYjciLCJpYXQiOjE2Nzc1OTM2ODEsImV4cCI6MTY3NzY4MDA4MX0.pIYLd7qxSEiMP9i4Wk0IulhQjxBd9y4MlwCGq0JUbAU" })
   readonly accessToken: string;

   @ApiProperty({ example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2ZlMDhhMDA0MDNhMGY4YzZkZTVjYjciLCJpYXQiOjE2Nzc1OTM2ODEsImV4cCI6MTY3ODE5ODQ4MX0.zBfsKLwq5gL3lfW9tabbp32RDjIA82k9rkufVWvDVc4" })
   readonly refreshToken: string;
}

export class WrongEmailOrPass {
   @ApiProperty({ example: 401 })
   readonly statusCode: number;

   @ApiProperty({ example: "Wrong email or password" })
   readonly message: string;
}

export class UnactivatedAccount {
   @ApiProperty({ example: 403 })
   readonly statusCode: number;

   @ApiProperty({ example: "Wrong email or password" })
   readonly message: string;
}

export class UserIsNotFound {
   @ApiProperty({example: 401})
   readonly statusCode: number

   @ApiProperty({example: "User is not found"})
   readonly message: string
}

export class ForgotPassBody {
   @ApiProperty({example: 'john_doe@gmail.com'})
   readonly email: string
}

export class ActivationBody {
   @ApiProperty({example: "ca6e6401-3561-4b5c-9748-bd0b90ea22ce"})
   readonly activationCode: string
}

export class CodeIsNotValid {
   @ApiProperty({example: 401})
   readonly statusCode: number

   @ApiProperty({example: "Activation code is not valid"})
   readonly message: string
}

export class RefreshBody {
   @ApiProperty({example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2ZlMDhhMDA0MDNhMGY4YzZkZTVjYjciLCJpYXQiOjE2Nzc1OTM2ODEsImV4cCI6MTY3ODE5ODQ4MX0.zBfsKLwq5gL3lfW9tabbp32RDjIA82k9rkufVWvDVc4'})
   readonly refreshToken: string
}

export class RefreshResponse {
   @ApiProperty({ example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2ZlMDhhMDA0MDNhMGY4YzZkZTVjYjciLCJpYXQiOjE2Nzc1OTM2ODEsImV4cCI6MTY3NzY4MDA4MX0.pIYLd7qxSEiMP9i4Wk0IulhQjxBd9y4MlwCGq0JUbAU" })
   readonly accessToken: string;

   @ApiProperty({ example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2ZlMDhhMDA0MDNhMGY4YzZkZTVjYjciLCJpYXQiOjE2Nzc1OTM2ODEsImV4cCI6MTY3ODE5ODQ4MX0.zBfsKLwq5gL3lfW9tabbp32RDjIA82k9rkufVWvDVc4" })
   readonly refreshToken: string;
}
