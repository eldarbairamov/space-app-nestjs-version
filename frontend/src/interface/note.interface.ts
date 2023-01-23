export interface INote {
   id: number,
   title: string,
   body: string,
   last_modified: number
}

export interface INoteDto {
   title: string,
   body: string,
   lastModified: Date
}