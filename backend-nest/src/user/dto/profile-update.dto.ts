import { IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ProfileUpdateDto {
   @ApiProperty({ example: "John" })
   @IsString()
   @IsOptional()
   readonly username: string;

   @ApiProperty({ example: "Doe" })
   @IsString()
   @IsOptional()
   readonly name: string;

   @ApiProperty({ example: "johnny_mnemonick" })
   @IsString()
   @IsOptional()
   readonly surname: string;

}