import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateMomentDto {
   @ApiProperty({ example: "My birthday", type: String })
   @IsNotEmpty()
   @IsString()
   readonly title: string;

   @ApiProperty({ example: "Location",  type: String })
   @IsNotEmpty()
   @IsString()
   readonly location: string;

   @ApiProperty({ example: 1677517089217, type: Number })
   @IsNotEmpty()
   @IsNumber()
   readonly date: number;

   @ApiProperty({ example: "tag",  type: String })
   @IsNotEmpty()
   @IsString()
   readonly tag: string;

}
