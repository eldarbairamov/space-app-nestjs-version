import { IsArray, IsDate, IsOptional, IsString } from "class-validator";

export class UpdateMomentDto {

   @IsString()
   @IsOptional()
   readonly title: string;

   @IsString()
   @IsOptional()
   readonly photo: string;

   @IsString()
   @IsOptional()
   readonly location: string;

   @IsDate()
   @IsOptional()
   readonly date: Date;

   @IsArray()
   @IsOptional()
   readonly tags: string[];

}