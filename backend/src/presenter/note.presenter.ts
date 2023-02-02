import { type INoteDatabase } from "../interface";
import { NoteDto } from "../dto/note.dto";

export const notePresenter = (document: INoteDatabase): NoteDto => {

   const date = new Date(document.updatedAt).getTime()

   return {
      id: document._id,
      title: document.title,
      body: document.body,
      lastModified: date,
   };
};

export const allNotesPresenter = (documents: INoteDatabase[]): NoteDto[] => {
   return documents.map(doc => notePresenter(doc));
};