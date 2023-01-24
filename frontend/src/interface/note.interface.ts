export interface INoteDto {
   id: string,
   title: string,
   body: string,
   lastModified: number
}

export interface INotesDto {
   notes: INoteDto[],
   count: number
}