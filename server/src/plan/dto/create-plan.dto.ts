import { IsString, NotEquals, ValidateIf } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePlanDto {
   @ApiProperty( { example: "English Plan", required: true } )
   @IsString()
   @NotEquals( null )
   @ValidateIf( ( object, value ) => value === null )
   readonly title: string;
}
