export class NoteResponseDto {
   id: string;
   title: string;
   body: string;
   lastModified: number;
}

export class NoteUpdateDto {
   readonly title: string;
   readonly body: string;
}