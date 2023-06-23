import { IsNotEmpty, IsNumber, IsString, NotEquals } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateMomentDto {
   @ApiProperty( { example: "My birthday", type: String } )
   @IsNotEmpty()
   @IsString()
   @NotEquals( null )
   readonly title: string;

   @ApiProperty( { example: "Location", type: String } )
   @IsNotEmpty()
   @IsString()
   @NotEquals( null )
   readonly location: string;

   @ApiProperty( { example: 1677517089217, type: Number } )
   @IsNotEmpty()
   @IsNumber()
   @NotEquals( null )
   readonly date: number;

   @ApiProperty( { example: "tag", type: String } )
   @IsNotEmpty()
   @IsString()
   @NotEquals( null )
   readonly tag: string;

}
