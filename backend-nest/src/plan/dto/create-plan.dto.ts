import { IsString, NotEquals } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePlanDto {
   @ApiProperty({ example: "English Plan", required: true })
   @IsString()
   @NotEquals(null)
   readonly title: string;
}
