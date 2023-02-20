import { NoteDocument } from "../model";

export interface INoteResponse {
   readonly id: NoteDocument["id"];
   readonly title: string;
   readonly body: string;
   readonly lastModified: number;
}

export interface IUpdateNote {
   readonly title: string;
   readonly body: string;
}