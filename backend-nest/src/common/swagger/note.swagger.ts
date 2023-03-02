import { INoteResponse } from "../../note/interface/note-response.interface";
import { NoteDocument } from "../../note/model/note.model";
import { ApiProperty } from "@nestjs/swagger";

export class NoteResponse implements INoteResponse {
   @ApiProperty({ example: "63dfe16eda233c96fc6e2604" })
   readonly id: NoteDocument["id"];

   @ApiProperty({ example: "Vivamus" })
   readonly title: string;

   @ApiProperty({ example: "Suspendisse ornare erat nec porttitor accumsan. Cras urna tellus, mattis in dui vel, fermentum tempus tortor. Aenean viverra ac augue non molestie. Phasellus id dapibus tellus. Vivamus venenatis nisi ac urna sollicitudin, at vehicula tellus tempus." })
   readonly body: string;

   @ApiProperty({ example: 1677440880312 })
   readonly lastModified: number;
}