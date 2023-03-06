import { IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class QueryDto {

   @ApiProperty({ name: "searchKey", description: "Keyword for searching", required: false })
   @IsOptional()
   readonly searchKey: string;

   @ApiProperty({ name: "limit", description: "Notes limit", required: false })
   @IsOptional()
   readonly limit: number;

}