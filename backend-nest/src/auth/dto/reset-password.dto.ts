import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ResetPasswordDto {
   @ApiProperty({ example: "123456", required: true })
   @IsString()
   @MinLength(6)
   @MaxLength(20)
   @IsNotEmpty()
   readonly password: string;

   @ApiProperty({
      example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2ZlMDhhMDA0MDNhMGY4YzZkZTVjYjciLCJpYXQiOjE2Nzc1OTM3NzYsImV4cCI6MTY3NzY4MDE3Nn0.WqHjhJFiTKpK_GvVW8V0e_drOukdQG0DDVZPkrKB62E",
      required: true,
   })
   @IsString()
   @IsNotEmpty()
   readonly resetPasswordToken: string;
}