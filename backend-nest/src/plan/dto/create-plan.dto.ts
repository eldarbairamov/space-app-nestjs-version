import { IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePlanDto {
   @ApiProperty({ example: "English Plan", required: true })
   @IsString()
   @IsOptional()
   readonly title: string;
}