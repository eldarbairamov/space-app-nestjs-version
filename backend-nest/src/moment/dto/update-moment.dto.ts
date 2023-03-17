import {  IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateMomentDto {
   @ApiProperty({ example: "My birthday", required: false, type: String })
   @IsString()
   @IsOptional()
   readonly title: string;

   @ApiProperty({ example: "Location", required: false, type: String })
   @IsString()
   @IsOptional()
   readonly location: string;

   @ApiProperty({ example: 1677517089217, required: false, type: Number })
   @IsNumber()
   @IsOptional()
   readonly date: number;

   @ApiProperty({ example: "tag", required: false, type: String })
   @IsString()
   @IsOptional()
   readonly tag: string;

}