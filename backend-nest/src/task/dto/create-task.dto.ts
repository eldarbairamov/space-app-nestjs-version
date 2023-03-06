import { IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTaskDto {
   @ApiProperty({ example: "Project", required: true })
   @IsString()
   @IsOptional()
   readonly title: string;

   @ApiProperty({ example: "63ffca12826b87decc6fee24", required: true })
   @IsString()
   @IsOptional()
   readonly planId: string;
}