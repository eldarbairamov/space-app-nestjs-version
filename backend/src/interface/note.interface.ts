import { NoteDocument } from "../model";

export interface INoteResponse {
   readonly id: NoteDocument["id"];
   readonly title: string;
   readonly body: string;
   readonly lastModified: number;
}

export interface INotesResponse {
   data: INoteResponse[];
   readonly count: number;
   readonly page: number;
   readonly totalPages: number;
   readonly perPage: number;
   readonly hasNextPage: boolean;
   readonly hasPrevPage: boolean;
}

export interface IUpdateNote {
   readonly title: string;
   readonly body: string;
}