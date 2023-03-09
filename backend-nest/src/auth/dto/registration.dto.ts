import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegistrationDto {

   @ApiProperty({ example: "john_doe123", required: true })
   @IsString()
   @IsNotEmpty()
   readonly username: string;

   @ApiProperty({ example: "john_doe@gmail.com", required: true })
   @IsEmail()
   @IsNotEmpty()
   readonly email: string;

   @ApiProperty({ example: "123456", required: true })
   @IsString()
   @MinLength(6)
   @MaxLength(20)
   @IsNotEmpty()
   readonly password: string;

}