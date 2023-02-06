import { NoteDocument } from "../model";

export interface INoteResponse {
   id: NoteDocument["id"];
   title: string;
   body: string;
   lastModified: number;
}

export interface IUpdateNote {
   readonly title: string;
   readonly body: string;
}