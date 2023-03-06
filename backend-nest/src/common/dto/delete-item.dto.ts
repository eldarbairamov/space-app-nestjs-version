import { IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class DeleteItemDto {

   @ApiProperty({ example: 31, type: Number, required: false })
   @IsNumber()
   @IsOptional()
   readonly limit: number;

   @ApiProperty({ example: "Coffee", type: String, required: false })
   @IsString()
   @IsOptional()
   readonly searchKey: string;

}