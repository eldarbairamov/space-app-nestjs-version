import { IsOptional, IsString } from "class-validator";

export class ProfileUpdateDto {

   @IsString()
   @IsOptional()
   readonly username: string;

   @IsString()
   @IsOptional()
   readonly name: string;

   @IsString()
   @IsOptional()
   readonly surname: string;

}