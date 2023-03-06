import { INoteResponse } from "../../note/interface/note-response.interface";
import { NoteDocument } from "../../note/model/note.model";
import { ApiProperty } from "@nestjs/swagger";

export class NoteResponse implements INoteResponse {
   @ApiProperty({ example: "63dfe16eda233c96fc6e2604", type: String })
   readonly id: NoteDocument["id"];

   @ApiProperty({ example: "Vivamus", type: String })
   readonly title: string;

   @ApiProperty({
      example: "Suspendisse ornare erat nec porttitor accumsan. Cras urna tellus, mattis in dui vel, fermentum tempus tortor. Aenean viverra ac augue non molestie. Phasellus id dapibus tellus. Vivamus venenatis nisi ac urna sollicitudin, at vehicula tellus tempus.",
      type: String,
   })
   readonly body: string;

   @ApiProperty({ example: 1677440880312, type: String })
   readonly lastModified: number;
}

export class NotesResponse {
   @ApiProperty({ type: [ NoteResponse ] })
   readonly data: NoteResponse[];

   @ApiProperty({ example: 30, type: Number })
   readonly count: number;
}