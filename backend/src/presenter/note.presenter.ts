import { type INoteDatabase } from "../interface";
import { NoteResponseDto } from "../dto";

export const notePresenter = (document: INoteDatabase): NoteResponseDto => {

   const date = new Date(document.updatedAt).getTime()

   return {
      id: document._id,
      title: document.title,
      body: document.body,
      lastModified: date,
   };
};

export const allNotesPresenter = (documents: INoteDatabase[]): NoteResponseDto[] => {
   return documents.map(doc => notePresenter(doc));
};