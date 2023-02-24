import { IsNotEmpty, IsString } from "class-validator";

export class DeletePhotoDto {

   @IsString()
   @IsNotEmpty()
   readonly fileName: string
}