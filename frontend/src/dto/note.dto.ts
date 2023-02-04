export class UpdateNoteDto {
   readonly title: string;
   readonly body: string;
}

export class GetNoteDto {
   readonly id: string;
   readonly title: string;
   readonly body: string;
   readonly lastModified: number;
}