import { IsOptional, IsString } from "class-validator";

export class CreatePlanDto {

   @IsString()
   @IsOptional()
   readonly title: string;

}