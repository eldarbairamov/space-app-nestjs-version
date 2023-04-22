import { IsString, NotEquals, ValidateIf } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateNoteDto {

   @ApiProperty({ example: "Phasellus", required: false })
   @IsString()
   @NotEquals(null)
   @ValidateIf((object, value) => value === null)
   readonly title: string;

   @ApiProperty({
      example: "Suspendisse ornare erat nec porttitor accumsan. Cras urna tellus, mattis in dui vel, fermentum tempus tortor. Aenean viverra ac augue non molestie. Phasellus id dapibus tellus. Vivamus venenatis nisi ac urna sollicitudin, at vehicula tellus tempus.",
      required: false,
   })
   @IsString()
   @NotEquals(null)
   @ValidateIf((object, value) => value === null)
   readonly body: string;

}
